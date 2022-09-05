
import config from '../src/config'

import { stream, getNextJob } from './lib/askbitcoin'

import { delay } from 'rabbi'

import { Miner } from 'boostminer'

import { PrivateyKey } from 'bsv'

import { log } from '../src/log'

import * as broadcastTransaction from 'broadcast-transaction'

import { importProofFromTxHex } from '../src/planaria'

stream.on('boostpow.proof.created', ({proof, job}) => {

  console.log("boostpow.proof.created", {proof, job})

})

stream.on('boostpow.job.created', (job) => {

  console.log("boostpow.job.created", {job})

})

const miner = new Miner({
  privatekey: config.get('boostpow_miner_privatekey') || new PrivateyKey().toWIF(),
  address: config.get('boostpow_miner_address')
})

async  function start() {

  while (true) {

    try {

      const job = await getNextJob()

      if (job) {

        const miningParams = {
          txid: job.tx_id,
          script: job.script,
          vout: job.tx_index,
          value: job.value,
          content: job.content,
          difficulty: parseFloat(job.diff)
        }

        console.log('job.mine', {miningParams, job})

        const result = await miner.mine(miningParams)

        console.log("job.mine.result", { result, job })

        const { txhex } = result

        log.info('miner.transaction.broadcast', { txhex })

        const txid = await broadcastTransaction(txhex)

        log.info('miner.transaction.broadcast.result', { txhex, txid })

        const record = await importProofFromTxHex(txhex)

        log.info('miner.proof.import.record', record)

        await delay(100)

      } else  {

        await delay(1000)


      }

    } catch (error) {

      log.error(error)

      console.log(error)

      await delay(1000)

    }

  }

}

if (require.main === module) {

  start()

}

