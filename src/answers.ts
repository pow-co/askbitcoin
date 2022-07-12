
import { Question } from './questions'

import { Author } from './authors'

import { Transaction } from './transactions'

import { knex } from './knex'

export interface Answer {

  question: Question;

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

export async function loadAnswers({ question_tx_id }: {question_tx_id: string}): Promise<Answer[]> {

  var query = knex('onchain_events')
    .where({
      key: 'answer'
    })

  if (question_tx_id) {

    query = query.whereJsonPath('value', '$.txid', '=', question_tx_id)
  }

  let answers = await  query.select('*')

  return answers.map(answer => {

    try {

      const value = JSON.parse(answer.value)

      return Object.assign(answer, { value })

    } catch(error) {

      return null

    }

  }).filter(answer => !!answer)

}

