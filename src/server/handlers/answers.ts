
import { knex } from '../../knex'

import { badRequest, notFound } from 'boom'

import { log } from '../../log'

import { loadQuestion } from '../../questions'

import { loadAnswers, loadAnswer, recentAnswers } from '../../answers'

export async function create(req, h) {

}

export async function build(req, h) {

}

export async function index(req, h) {

  try {

    let answers = await loadAnswers(req.query)

    return {

      answers

    }

  } catch(error) {

    console.log(error)

    return badRequest(error)

  }

}


export async function recent(req, h) {

  try {

    let answers = await recentAnswers(req.query)

    return {

      answers

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {
  value: any;
}

export async function show(req, h) {

  const { tx_id } = req.params

  try {

    let answer = await loadAnswer({ tx_id })

    if (!answer) {

      return notFound()
    }

    let question = await loadQuestion({ tx_id: answer.question_tx_id })

    return { answer, question }

  } catch(error) {

    log.error('http.api.answers.show.error', error)

    return badRequest(error)

  }

}


