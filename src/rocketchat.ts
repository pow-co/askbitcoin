require('dotenv').config()

import { Actor, log } from 'rabbi'
import { Question, Answer, BoostpowJob, BoostpowProof } from './models'

import * as models from './models'

var actors;

export async function notifyRocketChat(message: string): Promise<void> {

}

export async function notifyQuestionCreated(question: Question): Promise<void> {

  return notifyRocketChat(`question.created - ${question.content}`)

}

export async function notifyAnswerCreated(answer: Answer): Promise<void> {

  return notifyRocketChat(`answer.created - ${answer.content}`)


}

export async function notifyBoostpowJobCreated(job: BoostpowJob, content: Question | Answer): Promise<void> {

  if (content instanceof Question) {

    return notifyRocketChat(`boostpow.question.job.created - diff(${job.diff}) - ${content.content}`)

  }

  if (content instanceof Answer) {
    
  }


}

export async function notifyBoostpowProofCreated(proof: BoostpowProof): Promise<void> {

}

export async function start() {

  if (!actors) {

    actors = {}

    actors['question.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.question.created',
      queue: 'askbitcoin.question.created.rocketchat.notify',
    })

    actors['question.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.question.created.rocketchat.notify', json)

      channel.ack(msg)

    })

    actors['answer.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.answer.created',
      queue: 'askbitcoin.answer.created.rocketchat.notify',
    })

    actors['answer.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      channel.ack(msg)

    })

    actors['boostpow.job.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.boostpow.job.created',
      queue: 'askbitcoin.boostpow.job.created.rocketchat.notify',
    })

    actors['boostpow.job.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      channel.ack(msg)

    })

    actors['boostpow.job.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.boostpow.proof.created',
      queue: 'askbitcoin.boostpow.proof.created.rocketchat.notify',
    })

    actors['boostpow.job.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      channel.ack(msg)

    })

  }

  return actors

}

if (require.main === module) {

  start()
}
