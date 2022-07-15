
import { log } from './log'

import { Answer } from './answers'

import { Author } from './authors'

import { Transaction } from './transactions'

import config from './config'

import { Wallet } from './rabbi/onchain'

import { knex } from './knex'

type QuestionsStore = {
  [key: string]: Question
}

class QuestionNotFound extends Error {
  message = 'question not found'
  name = 'QuestionNotFound'
  code = 404
}

export const questions: QuestionsStore = {}

export interface Question {

  content: string;

  transaction: Transaction;

  answers?: Answer[];

  author?: Author;

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

  return {
    content,
    answers: [],
    transaction: {
      txid: transaction.hash,
      hex: transaction.serialize()
    }
  }

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

  return {
    question: newAnswer.question,
    content: newAnswer.content,
    transaction: {
      txid: transaction.hash,
      hex: transaction.serialize()
    }
  }

}

interface QuestionsQuery {
  start_timestamp?: string;
  end_timestamp?: string;
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

export async function loadQuestion(query: LoadQuestion): Promise<Question> {

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

  unBoosted.difficulty = 0

  return unBoosted

}

