
import { Answer } from './answers'

import { Author } from './authors'

import { Transaction } from './transactions'

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

  return []

}

export async function find(txid: string): Promise<Question> {

  return {
    content: '',
    answers: [],
    transaction: {
      txid: '',
      hex: ''
    }
  }

}

export async function ask(content: string): Promise<Question> {

  return {
    content: '',
    answers: [],
    transaction: {
      txid: '',
      hex: ''
    }
  }

}

interface NewAnswer {
  question: Question;
  content: string;
}

export async function answer(newAnswer: NewAnswer): Promise<Answer> {

  return {
    question: newAnswer.question,
    content: newAnswer.content,
    transaction: {
      hex: '',
      txid: ''
    }
  }

}

