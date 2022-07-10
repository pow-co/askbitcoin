
import * as bsv from 'bsv'

import * as filepay from 'filepay'

import * as uuid from 'uuid'

import { run } from '../../run'

import { Bsv } from 'bsv'

interface Message {
  app: string;
  key: string;
  value: any;
  nonce?: string;
}

interface BlockchainMessage extends Message {
  txid: string;
  vout: number;
  script: string;
  author?: string;
}

interface ActorParams {
  purse: string;
  owner: string;
}

export const authorIdentityPrefix = '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva';

export class Actor {

  purse: bsv.PrivKey;

  owner: bsv.PrivKey;

  constructor(options: ActorParams) {

    this.purse = new bsv.PrivKey().fromWif(options.purse)

    this.owner = new bsv.PrivKey().fromWif(options.owner)
  }

  get identity() {
    return new bsv.Address().fromPrivKey(this.owner).toString()

  }

  publish(newMessage: Message): Promise<BlockchainMessage> {

    return new Promise((resolve, reject) => {

      newMessage.nonce = newMessage.nonce || uuid.v4()

      const keypair = new bsv.KeyPair().fromPrivKey(this.owner)

      const value = JSON.stringify(newMessage.value)

      const { app, key, nonce } = newMessage

      const valueToSign = `${app}${key}${value}${nonce}`

      const signature = bsv.Bsm.sign(Buffer.from(valueToSign), keypair)

      let address = new bsv.Address().fromString(this.identity)

      let verified = bsv.Bsm.verify(Buffer.from(valueToSign, 'utf8'), signature, address)

      if (!verified) {
        throw new Error('SIGNATURE NOT VERIFIED')
      }

      const params = {
        pay:  {
          key: this.purse.toWif(),
          to: [{

            data: [
              'onchain',
              newMessage.app,
              newMessage.key,
              valueToSign,
              "|",
              authorIdentityPrefix,
              "BITCOIN_ECDSA",
              this.identity,
              signature,
              0x05 // signed index #5 "valueToSign"
            ],

            value: 0
          }]
        }

      };

      filepay.build(params, async (error, tx) => {

        if (error) { return reject(error.response) }

        let txid = await run.blockchain.broadcast(tx)

        resolve(tx)

      })

    })

  }

}

