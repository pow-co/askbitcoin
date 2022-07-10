
import { Answer } from './answers'

import { Author } from './authors'

import { Transaction } from './transactions'

import config from './config'

import { Wallet } from './rabbi/onchain'

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

  return []

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

  console.log({ transaction })

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
  console.log(newAnswer.question)

  let transaction = await wallet.build('answer', {
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

