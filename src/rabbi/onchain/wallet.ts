
import * as bsv from 'bsv'

import { run } from '../../run'

import config from '../../config'

import * as filepay from 'filepay'

import fetch from 'node-fetch'

import { Actor } from './actor'

interface RunUtxo {
  txid: string;
  vout: number;
  script: string;
  satoshis: number;
}

interface FilepayUtxo {
  txid: string;
  outputIndex: number;
  script: string;
  value: number;
}

export class Wallet {

  private_key: bsv.PrivateKey

  utxos: RunUtxo[];

  constructor(private_key: string) {

    this.private_key = new bsv.PrivateKey(private_key)

  }

  async WOC_list_address_utxos(): Promise<RunUtxo[]> {

    const unspentUrl = `https://api.whatsonchain.com/v1/bsv/main/address/${this.address}/unspent`

    let result = await fetch(unspentUrl)

    let json = await result.json()

    return []
  }

  get address(): bsv.Address {

    return this.private_key.toAddress().toString()

  }

  get balance(): number {

    return this.utxos.reduce((sum, utxo) => sum + utxo.satoshis, 0)

  }

  async sync() {

    this.utxos = await run.blockchain.utxos(this.address)

    await this.WOC_list_address_utxos()

  }

  get outputs() {

    this.sync()

    return this.utxos
  }

  async publish(key: string, json: any): Promise<bsv.Transaction> {

    let transaction = await this.build(key, json)

    await run.blockchain.broadcast(transaction.serialize())

    return transaction

  }

  build(key: string, json: any): Promise<bsv.Transaction> {

    return new Promise((resolve, reject) => {

      let inputs: FilepayUtxo[] = this.utxos.map(utxo => {

        return Object.assign(utxo, {
          outputIndex: utxo.vout,
          value: utxo.satoshis
        })
      })

      const app_id = config.get('askbitcoin_onchain_app_id')

      const newTransaction = {
        data: ['onchain', app_id, key, JSON.stringify(json)],
        pay: {
          key: this.private_key.toWIF(),
          changeAddress: this.address,
          inputs,
          /*to: [{
            data: ['onchain', app_id, key, JSON.stringify(json)]
          }]*/
        }
      }

      filepay.build(newTransaction, (error, tx) => {

        if (error) {

          return reject(error)
        }

        resolve(tx)

      })

      return new bsv.Transaction()

    })

  }

}
