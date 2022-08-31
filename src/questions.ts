
import { log } from './log'

import { Answer, parseAnswersFromTxHex } from './answers'

import { Author } from './authors'

import { Transaction } from './transactions'

import { Wallet } from './rabbi/onchain'

import { knex } from './knex'

import { run } from './run'

type QuestionsStore = {
  [key: string]: Question
}

import * as models from './models'
import { bsv } from 'boostpow'

class QuestionNotFound extends Error {
  message = 'question not found'
  name = 'QuestionNotFound'
  code = 404
}

const txo = require('txo')

export const questions: QuestionsStore = {}

export interface Question {

  content: string;

  transaction: Transaction;

  tx_id: string;

  tx_index: number;

  id?: number;

  answers?: Answer[];

  author?: Author;

  timestamp?: Date;

}

interface Query {
  start_timestamp?: Date;
  end_timestamp?: Date;
  author_paymail?: string;
  author_public_key?: string;
}

export async function list(query: Query = {}): Promise<Question[]> {

  let result = await knex('onchain_events').where({
    key: 'question'
  }).select('*')

  return result

}

export async function find(txid: string): Promise<Question> {

  let question = questions[txid]

  if (!question) {

    throw new QuestionNotFound()

  }

  return question

}

export async function loadSeeds() {

  const questions = [{
    app_id: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN',
    key: 'question',
    value: '{"content":"Who is the best philosopher living today?"}',
    txid: '9a489f00201a584f3c426ece03e184bacdc41d83b044daf1b5cd1f85adb1c567',
    timestamp: 1657463986717,
    index: 0,
    eventsource: true
  }]
}

interface AskQuestionOptions {
  broadcast?: boolean;
}

export async function ask(wallet: Wallet, content: string, options: AskQuestionOptions ={}): Promise<Question> {

  let transaction = await wallet.publish('question', { content })

  const txhex = transaction.serialize()

  const [question] = await parseQuestionsFromTxHex(txhex)

  return question

}

interface NewAnswer {
  question: Question;
  content: string;
}

export async function answer(wallet: Wallet, newAnswer: NewAnswer): Promise<Answer> {

  let utxos = await wallet.sync()

  let transaction = await wallet.publish('answer', {
    txid: newAnswer.question.transaction.txid,
    content: newAnswer.content
  })

  const hex = transaction.serialize()

  const [answer] = await parseAnswersFromTxHex(hex)

  return answer

}

interface QuestionsQuery {
  start_timestamp?: string;
  end_timestamp?: string;
}

interface RecentQuestionsQuery {
  limit?: number;
}

export async function recentQuestions(query: RecentQuestionsQuery={}): Promise<models.Question[]> {

  let questions = await knex('questions')
    .select(['*'])
    .orderBy('created_at', 'desc')
    .limit(query.limit || 100)

  return questions

}

export async function loadQuestions(query: QuestionsQuery={}): Promise<Question[]> {

  const start_timestamp = query.start_timestamp || 0;

  const end_timestamp = query.end_timestamp || Date.now();


  log.info('questions.load.query', { start_timestamp, end_timestamp })

  let boostedQuestions = await knex('questions')
    .join('boostpow_proofs', 'questions.tx_id', 'boostpow_proofs.content')
    .where('boostpow_proofs.timestamp', '>=', start_timestamp)
    .where('boostpow_proofs.timestamp', '<=', end_timestamp)
    .select(['questions.*', 'difficulty'])
    .sum('difficulty as difficulty')
    .groupBy('boostpow_proofs.content')
    .orderBy('difficulty', 'desc')

  let allQuestions = await knex('questions')
    .where('id', 'not in', boostedQuestions.map(q => q.id))
    .orderBy('id', 'desc')
    .limit(100)
    .select('*')


  allQuestions = allQuestions.map(question => {

    if (!question.difficulty) {

      question.difficulty = 0

    }

    return question

  })

  const questions = [...boostedQuestions, ...allQuestions].sort((a, b) => {

    var diff_a = a.difficulty || 0
    var diff_b = b.difficulty || 0

    return diff_a < diff_b ? 1 : 0

  })

  return questions

}

interface LoadQuestion {
  tx_id: string;
  tx_index?: number;
  start_timestamp?: number;
  end_timestamp?: number;
}

export async function loadQuestion(query: LoadQuestion): Promise<Question | null> {

  const start_timestamp = query.start_timestamp || 0;

  const end_timestamp = query.end_timestamp || Date.now();

  log.debug('question.load.query', query)

  let [question] = await knex('questions')
    .join('boostpow_proofs', 'questions.tx_id', 'boostpow_proofs.content')
    .where('boostpow_proofs.timestamp', '>=', start_timestamp)
    .where('boostpow_proofs.timestamp', '<=', end_timestamp)
    .where('questions.tx_id', query.tx_id)
    .sum('difficulty as difficulty')
    .groupBy('boostpow_proofs.content')
    .orderBy('difficulty', 'desc')
    .select(['questions.*', 'difficulty'])

  if (question) {

    return question

  }

  let [unBoosted] = await knex('questions')
      .where('tx_id', query.tx_id)
      .select('*')

  if (unBoosted) {
    unBoosted.difficulty = 0
  }

  return unBoosted

}

interface ImportQuestionResult {
  
  question: Question,

  isNew: boolean

}

export async function parseQuestionsByTxid(txid: string): Promise<Question[]> {

  const hex = await run.blockchain.fetch(txid)

  return parseQuestionsFromTxHex(hex)

}


import { findOne, findOrCreate } from './orm'

export async function importQuestionsByTxid(txid: string): Promise<ImportQuestionResult[]> {

  const hex = await run.blockchain.fetch(txid)

  return importQuestionsByTxHex(hex)

}

export async function importQuestionsByTxHex(hex: string): Promise<ImportQuestionResult[]> {

  const questions: Question[] = await parseQuestionsFromTxHex(hex)

  return Promise.all(questions.map(async (question) => {

    const {record, isNew} = await findOrCreate<Question>('questions', {
      where: {
        tx_id: question.tx_id,
        tx_index: question.tx_index
      },
      defaults: {
        tx_id: question.tx_id,
        tx_index: question.tx_index,
        content: question.content,
        timestamp: question.timestamp || new Date()
      }
    })

    return {question: record, isNew }

  }))
}


export async function parseQuestionsFromTxHex(txhex: string): Promise<Question[]> {

  try {

    const _txo = await txo.fromTx(txhex)

    if (!_txo) { return null }

    const txid = _txo['tx']['h']

    const questions = _txo['out'].map(out => {

      try {

        if (out['s2'] === 'onchain' &&
            out['s3'] === '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN' &&
            out['s4'] === 'question' &&
            out['s5']) {

          const { content } = JSON.parse(out['s5'])
  
          if (content) {
  
            const question: Question = {
              content,
              tx_index: out['i'],
              tx_id: txid,
              transaction: {
                txid,
                hex: txhex
              }
            }
  
            return question
  
          }
  
        }

      } catch(error) {

        log.error('importQuestionsFromTransaction.error', error)

      }

      return false

    }).filter(question => !!question)
    
    return questions;

  } catch(error) {

    log.error('importQuestionsFromTransaction.error', error)

    return [];

  }

}
