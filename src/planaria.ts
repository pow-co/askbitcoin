require("dotenv").config()

import * as boostpow from 'boostpow'

import * as whatsonchain from "./whatsonchain"

import { Crawler } from './rabbi/planaria'

import { getTransaction } from './powco'

import { log } from './log'

import config from './config'

import { models, Question } from './models'

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
          signature: output['s8'],
          source: 'bitbus'
        }

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

        var value = output['s5']

        if (typeof value === 'string') {

          value = JSON.parse(value)

        }

        let message: OnchainTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          app_id: output['s3'],
          key: output['s4'],
          value,
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitbus'
        }

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
  source?: string;
}

import { knex } from './knex'
import { error } from 'winston'

async function handleQuestion(data: OnchainTransaction): Promise<Question | null> {

  if (typeof data.value === 'string') {

    data.value = JSON.parse(data.value)

  }

  var { value, tx_id, tx_index, author } = data

  const question = await Question.findOne({
    where: {
      tx_id, tx_index
    }
  })

  if (question) {

    return question

  }

  var timestamp: Date;

  try {

    let woc_tx = await whatsonchain.getTransaction(tx_id)

    if (woc_tx && woc_tx.time) {

      timestamp = woc_tx.time

    }

  } catch(error) {

    log.error('whatsonchain.get_transaction', error)

  }

  if (!question) {

    const defaults = {
      tx_id,
      tx_index,
      timestamp: timestamp,
      content: value.content
    }

    try {

      let [record, isNew] = await Question.findOrCreate({
        where: {
          tx_id,
          tx_index
        },
        defaults
      })

      if (isNew) {

        log.info('question.recorded', JSON.parse(JSON.stringify(record)))

      }

      return record

    } catch(error) {

      log.error('question.insert', error)

    }

  }

}

async function handleAnswer(data: OnchainTransaction) {

  var { value, tx_id, tx_index, author } = data

  let [answer] = await knex('answers').where({ tx_id }).select('*')
  
  let timestamp = null

  try {

    let woc_tx = await whatsonchain.getTransaction(tx_id)

    if (woc_tx && woc_tx.time) {

      timestamp = woc_tx.time

    }

  } catch(error) {

    log.error('whatsonchain.get_transaction', error)

  }

  if (answer && answer.createdAt === null){

    let record = await knex('answers').where({ tx_id: tx_id}).update({ created_at: timestamp})
    log.info('answer.updated', { timestamp, record })

  }

  if (!answer) {


    var { content, txid: question_tx_id } = value

    if (!question_tx_id) {
      question_tx_id = value.question_tx_id
    }

    const insert = {
      tx_id,
      tx_index,
      created_at: timestamp,
      question_tx_id,
      content,
      author
    }

    await knex('answers').insert(insert)

    log.info('answer.recorded', insert)

  }


}

export async function handleOnchainTransaction(data: OnchainTransaction) {

  var { tx_id, tx_index, app_id, key, value, nonce, author, signature } = data

  try {

    if (typeof value === 'string') {

      value = JSON.parse(value)

    }

  } catch(error) {

    log.debug('handleOnchainTransaction.error', error)

    return

  }

  try {

    let [record] = await knex('onchain_events').where({
      tx_id: data.tx_id,
      tx_index: data.tx_index
    }).select('id')

    if (record) {

      log.debug('onchain.transaction.duplicate', data)

    } else {

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

      const result = await knex('onchain_events').insert(insert)

      log.info('onchain.event.recorded', insert)

    }

    if (key === 'question') {

      try {

        return handleQuestion(data)

      } catch(error) {

        log.error('handleQuestion', error)

      }

    }

    if (key === 'answer') {

      try {

        return handleAnswer(data)

      } catch(error) {

        log.error('handleAnswer', error)

      }

    }

    if (app_id === config.get('boostpow_onchain_app_id')) {

      if (key === 'job') {

      }

      if (key === 'proof') {

        let proof_txid = value.tx_id || tx_id

        let proof_tx = await getTransaction(proof_txid)

        let proof = boostpow.BoostPowJobProof.fromTransaction(proof_tx)

        let json = Object.assign(proof.toObject(), {
          tx_id: proof.txid,
          tx_index: proof.vin
        })

        const [record] = await knex('boostpow_proofs').where({
          tx_id: proof.txid,
          tx_index: proof.vin
        })
        .select('*')

        if (!record) {

          const result = await knex('boostpow_proofs').insert(json)

        }

      }

    }
  } catch(error) {

  log.error('handleOnchainTransaction', error)

}

}
