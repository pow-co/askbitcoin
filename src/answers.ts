
import { Question } from './questions'

import { Author } from './authors'

import { Transaction } from './transactions'

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

