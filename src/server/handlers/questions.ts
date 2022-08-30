
import { knex } from '../../knex'

import { badRequest, notFound } from 'boom'

import { loadQuestion, loadQuestions, recentQuestions, importQuestionsByTxHex } from '../../questions'

import { loadAnswers } from '../../answers'

export async function create(req, h) {

  try {

    let question = await importQuestionsByTxHex(req.payload.transaction)

    return {

      question

    }

  } catch(error) {

    return badRequest(error)

  }

}

export async function build(req, h) {

}

export async function index(req, h) {

  try {

    let questions = await loadQuestions(req.query)

    return {

      questions

    }

  } catch(error) {

    return badRequest(error)

  }

}

export async function recent(req, h) {

  try {

    let questions = await recentQuestions(req.query)

    return {

      questions

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {

}

interface Question {

}

export async function show(req, h) {

  try {

    const question = await loadQuestion({ tx_id: req.params.tx_id })

    if (!question) {

      return notFound()

    }

    const answers = await loadAnswers({
      question_tx_id: req.params.tx_id,
      ...req.query
    })

    return {

      question,

      answers

    }

  } catch(error) {

    return badRequest(error)

  }



}


