
import { knex } from '../../knex'

import { badRequest, notFound } from 'boom'

import { log } from '../../log'

import { loadQuestion } from '../../questions'

import { loadAnswers } from '../../answers'

export async function create(req, h) {

}

export async function build(req, h) {

}

export async function index(req, h) {

  try {

    let answers = await knex('onchain_events')
      .where({
        key: 'answer'
      })
      .select('*')

    answers = answers.map(answer => {

      try {

        const value = JSON.parse(answer.value)

        return Object.assign(answer, { value })

      } catch(error) {

        return null

      }

    }).filter(answer => !!answer)



    console.log('answers')

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

async function loadAnswer({ tx_id }: {tx_id: string}): Promise<Answer> {

  let [answer] = await knex('onchain_events')
    .where({
      key: 'answer',
      tx_id
    })
    .select('*')

  if (!answer) {
    return
  }

  const value = JSON.parse(answer.value)

  return Object.assign(answer, { value })

}

export async function show(req, h) {

  const { tx_id } = req.params

  try {

    let answer = await loadAnswer({ tx_id })

    if (!answer) {

      return notFound()
    }

    let question = await loadQuestion({ tx_id: answer.value.txid })

    return { answer, question }

  } catch(error) {

    log.error('http.api.answers.show.error', error)

    return badRequest(error)

  }

}


