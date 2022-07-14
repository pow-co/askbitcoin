require("dotenv").config()

import { Crawler } from './rabbi/planaria'

import { getTransaction } from './powco'

import { log } from './log'

import config from './config'

//import { leveldb } from './rabbi/onchain'

import { run } from './run'

export const onchainQueue = require('fastq').promise(handleOnchainTransaction, 1)

export async function sync_boost_orders() {

  const block_height_start = 0

  const crawler = new Crawler({

    query: {
      q: {
        find: { "out.s0": "boostpow", "blk.i": { "$gt": block_height_start } },
      }
    },

    onTransaction: async (json) => {

      let hash = json['tx']['h']

      /*leveldb.get(hash, async (error, hex) => {

        if (!hex) {

          hex = await run.blockchain.fetch(hash)

        }

        await leveldb.put(hash, hex)

      })
      */

    }
  })

  crawler.start()

}

export async function _sync_boost_onchain() {

  const block_height_start = 0

  const crawler = new Crawler({

    query: {
      q: {
        find: { "out.s0": "boostpow", "blk.i": { "$gt": block_height_start } },
      }
    },

    onTransaction: async (json) => {

      let hash = json['tx']['h']

      /*leveldb.get(hash, async (error, hex) => {

        if (!hex) {

          hex = await run.blockchain.fetch(hash)

        }

        await leveldb.put(hash, hex)

      })
      */

    }
  })

  crawler.start()

}


export async function sync_ask_bitcoin() {

  const app_id = config.get('askbitcoin_onchain_app_id')

  return sync_onchain_app(app_id)
}

export async function sync_boost_onchain() {

  const app_id = config.get('boostpow_onchain_app_id')

  return sync_onchain_app(app_id)
}

export async function sync_all_onchain(app_id: string) {

  const block_height_start = 738000

  const crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s2": "onchain",
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')

      outputs.map(output => {

        let message: OnchainTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          app_id: output['s3'],
          key: output['s4'],
          value: JSON.parse(output['s5']),
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8']
        }
        console.log('__planaria', message)

        onchainQueue.push(message)

      })


    }
  })

  crawler.start()
}

export async function sync_onchain_app(app_id: string) {

  const block_height_start = 738000

  const crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s2": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        let message: OnchainTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          app_id: output['s3'],
          key: output['s4'],
          value: JSON.parse(output['s5']),
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8']
        }

        console.log('__planaria', message)

        onchainQueue.push(message)

      })

    }
  })

  crawler.start()

}

export async function sync_boostpow_onchain() {

  const block_height_start = 738000

  const boostpow_jobs_crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('powco_onchain_app_id'),
          "out.s2": "boostpow.job",
          "blk.i": {
            "$gt": block_height_start
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('onchain.powco.boost.job.json', json)

    }
  })

  const proofs_start_height = 738000

  const boostpow_proofs_crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('powco_onchain_app_id'),
          "out.s2": "boostpow.proof",
          "blk.i": {
            "$gt": proofs_start_height
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('onchain.powco.boost.proof.json', json)

    }

  })

  boostpow_proofs_crawler.start()

  boostpow_jobs_crawler

}

export interface OnchainTransaction {
  tx_id: string;
  tx_index: number;
  app_id: string;
  key: string;
  value: any;
  nonce?: string;
  author?: string;
  signature?: string;
}

import { knex } from './knex'

export async function handleOnchainTransaction(data: OnchainTransaction) {

  try {

    let [record] = await knex('onchain_events').where({
      tx_id: data.tx_id,
      tx_index: data.tx_index
    }).select('id')

    if (record) {

      log.debug('onchain.transaction.duplicate', data)

      return

    } else {

      const { tx_id, tx_index, app_id, key, value, nonce, author, signature } = data

      console.log('__value', value)

      const insert = {
        tx_id,
        tx_index,
        app_id,
        key,
        value,
      }

      if (nonce) { insert['nonce'] = nonce }

      if (author) { insert['author'] = author }

      if (signature) { insert['signature'] = signature }

      console.log("insert", insert)

      const result = await knex('onchain_events').insert(insert)

      log.info('onchain.event.recorded', insert)

      if (key === 'question') {

        let [question] = await knex('questions').where({ tx_id }).select('*')

        if (!question) {

          const insert = {
            tx_id,
            content: value.content,
            author
          }

          await knex('questions').insert(insert)

          log.info('question.recorded', insert)

        }

      }

      if (key === 'answer') {

        let [answer] = await knex('answers').where({ tx_id }).select('*')

        if (!answer) {

          const { content, question_id } = value

          const insert = {
            tx_id,
            question_id,
            content,
            author
          }

          await knex('answers').insert(insert)

          log.info('answer.recorded', insert)

        }

      }

      if (app_id === config.get('boostpow_onchain_app_id')) {

        if (key === 'job') {

        }

        if (key === 'proof') {

          let proof_txid = value.tx_id || tx_id

          let proof_tx = await getTransaction(proof_txid)

          console.log({ proof_tx })

        }

      }

    }
  } catch(error) {

  log.error('handleOnchainTransaction', error)

}

}
