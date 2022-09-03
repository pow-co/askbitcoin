require('dotenv').config()

import { Actor, log } from 'rabbi'
import { Question, Answer, BoostpowJob, BoostpowProof } from './models'

import * as models from './models'

var actors;

const http = require("superagent");

const base = 'https://chat.21e8.tech/hooks';

const channels = {
  'misc': 'nbfWhcsDeXypz4RDu/AXqEGLCQbno7gotBTuipAwsZzuTTMtPZ3LHfRx86u3dHf6aY',
  'askbitcoin': 'bw53REAnr3fP56WzF/NFv8RNetbqwY24Ybqnr2pi3Xne8JxwR4aLdXEmDHNhyfgy9h'
}

export function notify(channel, message: string) {

  if (!channels[channel]) {
    log.info(`rocketchat channel ${channel} not found`);
    channel = 'misc';
  }

  log.info(`notify slack ${message}`);

  http
    .post(`${base}/${channels[channel]}`)
    .send({
      text: message
    })
    .end((error, response) => {
      if (error) {
        log.error("rocketchat.error", error.message);
      } else {
        log.info("rocketchat.notified", response.body);
      }
    });
}

export async function notifyRocketChat(message: string): Promise<void> {

  return notify('askbitcoin', message)

}

export async function notifyQuestionCreated(question: Question): Promise<void> {

  return notifyRocketChat(`question.created - ${question.content} - ${question.tx_id}`)

}

export async function notifyAnswerCreated(answer: Answer): Promise<void> {

  return notifyRocketChat(`answer.created - ${answer.content} - ${answer.tx_id}`)


}

export async function notifyBoostpowJobCreated(job: BoostpowJob): Promise<void> {

  return notifyRocketChat(`boostpow.job.created - diff(${job.diff}) - ${job.tx_id}`)

}

export async function notifyBoostpowProofCreated(proof: BoostpowProof): Promise<void> {

  return notifyRocketChat(`boostpow.proof.created - diff(${proof.difficulty}) - ${proof.tx_id}`)


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

      notifyQuestionCreated(json)

      channel.ack(msg)

    })

    actors['answer.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.answer.created',
      queue: 'askbitcoin.answer.created.rocketchat.notify',
    })

    actors['answer.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      notifyAnswerCreated(json)

      channel.ack(msg)

    })

    actors['boostpow.job.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.boostpow.job.created',
      queue: 'askbitcoin.boostpow.job.created.rocketchat.notify',
    })

    actors['boostpow.job.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      notifyBoostpowJobCreated(json)

      channel.ack(msg)

    })

    actors['boostpow.job.created.rocketchat.notify'] = Actor.create({
      exchange: 'askbitcoin',
      routingkey: 'askbitcoin.boostpow.proof.created',
      queue: 'askbitcoin.boostpow.proof.created.rocketchat.notify',
    })

    actors['boostpow.job.created.rocketchat.notify'].start(async (channel, msg, json) => {

      log.info('actor.askbitcoin.answer.created.rocketchat.notify', json)

      notifyBoostpowProofCreated(json)

      channel.ack(msg)

    })

  }

  return actors

}

if (require.main === module) {

  start()
}
