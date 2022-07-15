
import { log } from './log'

import { Question } from './questions'

import { Author } from './authors'

import { Transaction } from './transactions'

import { knex } from './knex'

export interface Answer {

  question?: Question;

  question_tx_id?: string;

  content: string;

  transaction: Transaction;

  author?: Author;

}

interface Query {
  question?: Question;
  start_timestamp?: Date;
  end_timestamp?: Date;
  author_paymail?: string;
  author_public_key?: string;
}

export async function list(query: Query = {}): Promise<Answer[]> {

  return []

}

export async function find(answer_txid: string): Promise<Answer> {

  return {
    question: {
      content: '',
      transaction: {
        hex: '',
        txid: ''
      }
    },
    content: '',
    transaction: {
      hex: '',
      txid: ''
    },
    author: {
      paymail: '',
      public_key: ''
    }
  }

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

  console.log('__answer', answer)
  if (answer) {

    return answer

  }

  let [unBoosted] = await knex('answers')
      .where('tx_id', query.tx_id)
      .select('*')

  unBoosted.difficulty = 0

  console.log('__answer', unBoosted)

  return unBoosted

}

export async function loadAnswers(query: LoadAnswers): Promise<Answer[]> {

  const start_timestamp = query.start_timestamp || 0;

  const end_timestamp = query.end_timestamp || Date.now();

  log.debug('answers.load.query', query)

  const boostedAnswersQuery = knex('answers')
    .join('boostpow_proofs', 'answers.tx_id', 'boostpow_proofs.content')
    .where('boostpow_proofs.timestamp', '>=', start_timestamp)
    .where('boostpow_proofs.timestamp', '<=', end_timestamp)
    .sum('difficulty as difficulty')
    .groupBy('boostpow_proofs.content')
    .orderBy('difficulty', 'desc')

  if (query.question_tx_id) {

    boostedAnswersQuery.where('question_tx_id', query.question_tx_id)
  }

  const boostedAnswers = await boostedAnswersQuery.select(['answers.*', 'difficulty'])

  const unboostedAnswersQuery = knex('answers')
    .where('id', 'not in', boostedAnswers.map(a => a.id))
    .orderBy('id', 'desc')
    .limit(100)

  if (query.question_tx_id) {

    unboostedAnswersQuery.where('question_tx_id', query.question_tx_id)
  }

  let unboostedAnswers = await unboostedAnswersQuery.select('*')

  unboostedAnswers = unboostedAnswers.map(answer => {
    return {...answer, difficulty: 0}
  })

  return [...boostedAnswers, ...unboostedAnswers]

}

