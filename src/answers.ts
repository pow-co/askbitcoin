
import { log } from './log'

import { Question } from './questions'

import { Author } from './authors'

import { ensureTransaction, Transaction } from './transactions'

import * as txo from 'txo'

import { run } from './run'

import { findOne, findOrCreate } from './orm'

import * as models from './models'

import * as sequelize from 'sequelize'


export interface Answer {

  question?: Question;

  question_tx_id?: string;

  tx_id: string;

  tx_index: number;

  content: string;

  transaction: Transaction;

  author?: Author;

  id?: number;

}

interface Query {
  question?: Question;
  start_timestamp?: Date;
  end_timestamp?: Date;
  author_paymail?: string;
  author_public_key?: string;
}

interface RecentAnswersQuery {
  limit?: number;
}

export async function parseAnswersFromTxHex(txhex: string): Promise<Question[]> {

  try {

    const _txo = await txo.fromTx(txhex)

    const txid = _txo['tx']['h']

    const answers = _txo['out'].map(out => {

      try {

        if (out['s2'] === 'onchain' &&
            out['s3'] === '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN' &&
            out['s4'] === 'answer' &&
            out['s5'] || out['ls5']) {

          const { content, question_tx_id } = JSON.parse(out['s5'] || out['ls5'])

          console.log("CONNT", { content, question_tx_id })
  
          if (!!content) {

            if (!!question_tx_id) {
  
              const answer: Answer = {
                content,
                question_tx_id,
                tx_index: out['i'],
                tx_id: txid,
                transaction: {
                  txid,
                  hex: txhex
                }
              }
    
              return answer
    
            }

          }
  
        }

      } catch(error) {

      }

      return false

    }).filter(answer => !!answer)
    
    return answers;

  } catch(error) {

    log.error('parseAnswersFromTransaction.error', error)

    return [];

  }

}

export async function parseAnswersByTxid(txid: string): Promise<Answer[]> {

  const hex = await run.blockchain.fetch(txid)

  return parseAnswersFromTxHex(hex)

}

interface ImportAnswerResult {
  
  answer: models.Answer,

  isNew: boolean

}

export async function importAnswersByTxid(txid: string): Promise<ImportAnswerResult[]> {

  var isNew: boolean = true

  // look up the question in the database by txid

  const record: any = await models.Answer.findOne({ where: {

    tx_id: txid

  }})

  if (record) {

    isNew = false

    const answer: any = {

      id: record.id,

      tx_id: record.tx_id,

      tx_index: record.tx_index,

      content: record.content,

      transaction: { txid }

    }

    return [{

      answer,

      isNew

    }]

  }

  log.info('answers.importByTxid.blockchain.fetch', { txid })

  const hex = await run.blockchain.fetch(txid)

  log.info('answers.importByTxid.fetch.result', { txid, hex })

  return importAnswersByTxHex(hex, true)

}

export async function importAnswersByTxHex(hex: string, verified: boolean=false): Promise<ImportAnswerResult[]> {

  if (!verified) {

    await ensureTransaction(hex)

  }

  const answers: Answer[] = await parseAnswersFromTxHex(hex)

  return Promise.all(answers.map(async (answer) => {

    const [record, isNew] = await models.Answer.findOrCreate({
      where: {
        tx_id: answer.tx_id,
        tx_index: answer.tx_index,
        question_tx_id: answer.question_tx_id
      },
      defaults: {
        tx_id: answer.tx_id,
        tx_index: answer.tx_index,
        question_tx_id: answer.question_tx_id,
        content: answer.content,
        timestamp: new Date()
      }
    })

    return {answer: record, isNew }

  }))
}
