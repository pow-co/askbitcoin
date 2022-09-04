require("dotenv").config()

import * as boostpow from 'boostpow'

import * as whatsonchain from "./whatsonchain"

import { Crawler } from './rabbi/planaria'

import { getTransaction } from './powco'

import { log } from './log'

import config from './config'

import { models, Question, Answer } from './models'

import events from './events'

import { run } from './run'

import * as uuid from 'uuid'

import * as bsv from 'bsv'

import { BigNumber } from 'bignumber.js'

export const onchainQueue = require('fastq').promise(handleOnchainTransaction, 3)

export async function sync_boost_orders() {

  const block_height_start = 0

  const crawler = new Crawler({

    query: {
      q: {
        find: { "out.s0": "boostpow", "blk.i": { "$gt": block_height_start } },
      }
    },

    onTransaction: async (json) => {

      log.debug("__BOOST ORDER__", json)

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


  const crawler_sv = new Crawler({

    query: {
      q: {
        find: {
          "out.s2": "onchain.sv",
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

  crawler_sv.start()
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

  const crawler_sv = new Crawler({

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

  crawler_sv.start()

}

export async function sync_boostpow_onchain() {

  const block_height_start = 738000

  const jobsQuery =  {
    q: {
      find: {
        "out.s0": "onchain",
       /* "out.s1": config.get('boostpow_onchain_app_id'),
        "out.s2": "job",*/
        "blk.i": {
          "$gt": block_height_start
        }
      },
    }
  }

  log.info('planaria.boostpow.jobs.query', jobsQuery)

  const boostpow_jobs_crawler = new Crawler({

    query: jobsQuery,

    onTransaction: (json) => {

      log.info('onchain.powco.boost.job.json', json)

    }
  })

  boostpow_jobs_crawler.start();

  const proofs_start_height = 738000

  const boostpow_proofs_crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('boostpow_onchain_app_id'),
          "out.s2": "proof",
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
  timestamp?: Date;
}

import { error } from 'winston'

async function handleAnswer(data: OnchainTransaction) {

  var { value, tx_id, tx_index, author, timestamp } = data

  var record = await models.Answer.findOne({
    where: {
      tx_id,
      tx_index
    }
  })

  log.info('answer.record', { record, tx_id, tx_index })

  if (record) { return record }

  var answer;

  try {

    let woc_tx = await whatsonchain.getTransaction(tx_id)

    if (woc_tx && woc_tx.time) {

      timestamp = woc_tx.time

    }

  } catch(error) {

    log.error('whatsonchain.get_transaction', error)

  }

  try {

    if (!value.question_tx_id || !value.content) {

      return

    }

    const [_answer, isNew] = await models.Answer.findOrCreate({
      where: {
        tx_id,
        tx_index
      },
  
      defaults: {
        tx_id,
        tx_index,
        content: value.content,
        question_tx_id: value.question_tx_id,
        timestamp: timestamp || new Date()
      }
    })

    if (isNew) {

      log.info('answer.recorded', _answer.toJSON())

      events.emit('answer.created', _answer.toJSON())
    }
  
  } catch(error) {

    log.error('answer.handle.error', error)

  }

}

async function handleQuestion(data: OnchainTransaction) {

  var { value, tx_id, tx_index, timestamp } = data

  var record = await models.Question.findOne({
    where: {
      tx_id,
      tx_index
    }
  })

  log.debug('question.record', { record, tx_id, tx_index })

  if (record) { return record }

  if (!timestamp) {

    try {

      let woc_tx = await whatsonchain.getTransaction(tx_id)

      if (woc_tx && woc_tx.time) {

        timestamp = woc_tx.time

      }

    } catch(error) {

      log.error('whatsonchain.get_transaction', error)

    }

  }

  try {

    if (!value.content) {

      return

    }

    const [_answer, isNew] = await models.Question.findOrCreate({
      where: {
        tx_id,
        tx_index
      },
  
      defaults: {
        tx_id,
        tx_index,
        content: value.content,
        timestamp: timestamp || new Date()
      }
    })

    if (isNew) {

      log.info('question.recorded', _answer.toJSON())

      events.emit('question.created', _answer.toJSON())
    }
  
  } catch(error) {

    console.error('QUESTION FOC ERROR', error)

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

        log.error('__HANDLE_ANSWER_ERROR!!!', error)

      }

    }

    if (app_id === config.get('boostpow_onchain_app_id') || app_id === 'boostpow') {

      if (key === 'job') {

        try {

          let job_tx_id = value.tx_id || tx_id

          const exists = await models.BoostpowJob.findOne({
            where: {
              tx_id: job_tx_id,
              tx_index: value.index
            }
          })

          if (exists) {
            
            log.debug('boostpow.sync.onchain.job.exists', exists)

            return

          }

          let job_tx = await run.blockchain.fetch(job_tx_id)

          let job = boostpow.BoostPowJob.fromTransaction(job_tx)

          if (!job) {

            log.debug('boostpow.job.notfound', { tx_hex: job_tx })

            return

          }

          const tx = new bsv.Transaction(job_tx)

          const index = value.tx_index || 0

          const satoshis = tx.outputs[index].satoshis

          const timestamp = await whatsonchain.getTimestamp(job_tx_id)

          const defaults = Object.assign(job.toObject(), {
            tx_id: job.txid,
            tx_index: job.vout,
            timestamp,
            script: job.toScript().toHex(),
            value: satoshis,
            price: new BigNumber(satoshis).dividedBy(job.difficulty).toNumber()
          })

          const [record, isNew] = await models.BoostpowJob.findOrCreate({
            where: {
              tx_id: job.txid,
              tx_index: job.vout
            },
            defaults
          })

          if (isNew) {

            // check if the proof is already in the database, and add the proof_tx_id found
            const proof = await models.BoostpowProof.findOne({
              where: {
                job_tx_id: record.tx_id,
                job_tx_index: record.tx_index
                
              }
            })

            if (proof && !record.proof_tx_id) {

              record.proof_tx_id = proof.tx_id

              await record.save()
            }

          } else {

            if (!record.script) {
              // backfill old jobs which did not already include script

              record.script = job.toScript().toHex()

              await record.save()
            }

          }

          log.info('boostpow.job', record)

          events.emit('boostpow.job', record)

        } catch(error) {

          log.error('planaria.sync_boost_onchain.boostpow.job.error', {error, data})

        }

      }

      if (key === 'proof') {

        try {

          let proof_tx_id = value.tx_id || tx_id

          if (!proof_tx_id || value.tx_index === undefined) {

            return

          }

          const exists = await models.BoostpowProof.findOne({
            where: {
              tx_id: proof_tx_id,
              tx_index: value.tx_index
            }
          })

          if (exists) {

            log.debug('boostpow.sync.onchain.proof.exists', exists)

            return

          }

          const uid = uuid.v4()

          log.info('run.blockchain.fetch.start', { uid, timestamp: new Date() })

          let proof_tx = await run.blockchain.fetch(proof_tx_id)

          log.info('run.blockchain.fetch.stop', { uid, timestamp: new Date() })

          let proof = boostpow.BoostPowJobProof.fromRawTransaction(proof_tx)

          if (!proof) {

            log.info('boostpow.sync.onchain.proof.notfound', { proof_tx, data })

            return
          }

          const timestamp = await whatsonchain.getTimestamp(proof_tx_id)

          const jobRecord = await models.BoostpowJob.findOne({
            where: {
              tx_id: proof.spentTxid,
              tx_index: proof.spentVout
            }
          })

          const job_tx = await run.blockchain.fetch(proof.spentTxid)

          const job: boostpow.Job = boostpow.Job.fromRawTransaction(job_tx)

          const defaults = Object.assign(proof.toObject(), {
            tx_id: proof.txid,
            tx_index: proof.vin,
            timestamp,
            content_tx_id: job.toObject().content,
            difficulty: job.difficulty,
            job_tx_id: job.txid,
            job_tx_index: job.vout
          })

          const [record, isNew] = await models.BoostpowProof.findOrCreate({
            where: {
              tx_id: proof.txid,
              tx_index: proof.vin
            },
            defaults
          })

          if (isNew) {

            events.emit('boostpow.proof.created', record)

          }

          log.info('boostpow.proof', record)

          events.emit('boostpow.proof', record)

        } catch(error) {

          log.error(error, data)

          log.error('planaria.sync_boost_onchain.boostpow.proof.error', error)

        }

      }

    }
  } catch(error) {

  log.error('handleOnchainTransaction', {error, data })

}

}

if (require.main === module) {

  if (config.get('sync_boost')) {

    sync_onchain_app('boostpow')
  
    sync_onchain_app(config.get('boostpow_onchain_app_id'))

  }

}