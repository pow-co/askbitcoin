
import { log } from './log'

import { Question } from './questions'

import { Author } from './authors'

import { Transaction } from './transactions'

import { knex } from './knex'

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

interface LoadAnswers {
  question_tx_id: string;
  start_timestamp?: number;
  end_timestamp?: number;
}

interface LoadAnswer {
  tx_id: string;
  start_timestamp?: number;
  end_timestamp?: number;
}


export async function loadAnswer(query: LoadAnswer): Promise<Answer> {

  const start_timestamp = query.start_timestamp || 0;

  const end_timestamp = query.end_timestamp || Date.now();

  log.debug('answers.load.query', query)

  let [answer] = await knex('answers')
    .join('boostpow_proofs', 'answers.tx_id', 'boostpow_proofs.content')
    .where('boostpow_proofs.timestamp', '>=', start_timestamp)
    .where('boostpow_proofs.timestamp', '<=', end_timestamp)
    .sum('difficulty as difficulty')
    .groupBy('boostpow_proofs.content')
    .orderBy('difficulty', 'desc')
    .select(['answers.*', 'difficulty'])

  if (answer) {

    return answer

  }

  let [unBoosted] = await knex('answers')
      .where('tx_id', query.tx_id)
      .select('*')

  unBoosted.difficulty = 0

  return unBoosted

}

export async function loadAnswers(query: LoadAnswers): Promise<models.Answer[]> {

  const start_timestamp = query.start_timestamp || 0;

  const end_timestamp = query.end_timestamp || Date.now();

  log.info('answers.load.query', { start_timestamp, end_timestamp })
  
  const proofs = await models.BoostpowProof.findAll({
    attributes: [
      'content',
      [sequelize.fn('sum', sequelize.col('difficulty')), 'difficulty']
    ],
    group: ['content']
  })

  const answers = await models.Answer.findAll({
    order: [['id', 'desc']],
    limit: 100
  })

  return answers

}

interface RecentAnswersQuery {
  limit?: number;
}

export async function recentAnswers(query: RecentAnswersQuery={}): Promise<Answer> {

  let answers = await knex('answers')
    .select(['*'])
    .orderBy('created_at', 'desc')
    .limit(query.limit || 100)

  return answers

}

export async function parseAnswersFromTxHex(txhex: string): Promise<Question[]> {

  try {

    const _txo = await txo.fromTx(txhex)

    if (!_txo) { return null }

    const txid = _txo['tx']['h']

    const answers = _txo['out'].map(out => {

      try {

        if (out['s2'] === 'onchain' &&
            out['s3'] === '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN' &&
            out['s4'] === 'answer' &&
            out['s5']) {

          const { content, question_tx_id } = JSON.parse(out['s5'])
  
          if (content && question_tx_id) {
  
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

      } catch(error) {

        log.error('parseAnswersFromTransaction.error', error)

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

  const hex = await run.blockchain.fetch(txid)

  return importAnswersByTxHex(hex)

}

export async function importAnswersByTxHex(hex: string): Promise<ImportAnswerResult[]> {

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