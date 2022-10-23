
import { channel, log } from 'rabbi'

import { loadFromFiles } from '../config'

export const exchange = 'rabbi'

export const queue = 'reload_config'

export const routingkey = 'reload_config'


import { Job, BoostPowJobProof as Proof } from 'boostpow'

import { stream } from 'powco'

stream.on('boostpow.job', (job: Job) => {

  console.log('boostpow.job', job)

})

stream.on('boostpow.proof', (proof: Proof) => {

  console.log('boostpow.proof', proof)

})

export default async function start(channel, msg, json) {

  log.info('rabbi.actor.reload_config', {
    message: msg.content.toString(),
    json
  })

  loadFromFiles()
  
  channel.ack(msg)
}

