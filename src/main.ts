
import config from './config'

import { start as server } from './server'

import { BoostPowJob, BoostPowJobProof } from 'boostpow'

import * as whatsonchain from './whatsonchain'

import { start as actors } from './rabbi/actors'

import { start as import_powco_work_crawler } from './crawlers/import_powco_work'

import stream from './powco/stream'

import { onchain } from './rabbi/onchain/bitsocket'

import { spawn } from 'child_process'

import { log } from './log'

import { getTransaction } from './powco'

import { start as rocketchat } from './rocketchat'

export async function start() {

  if (config.get('webui_enabled')) {

    const nextjs = spawn("npm", ["run", "start"], {

      cwd: `${process.cwd()}/web-ui`

    });

  }

  if (config.get('notify_rocketchat')) {

    rocketchat();

  }

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  if (config.get('sync_powco')) {

    import_powco_work_crawler()

  }

  if (config.get('powco_stream')) {

    stream()

  }

  if (config.get('sync_ask_bitcoin')) {

    const app_id = config.get('askbitcoin_onchain_app_id')

    const boostpow = config.get('boostpow_onchain_app_id')

    onchain(boostpow).on('*', (event) => {
      log.info('onchain.boostpow.event', event)
    })

    onchain(boostpow).on('proof', async (proof) => {

      log.info(`onchain.${boostpow}.proof`, proof)

    })

    onchain(boostpow).on('job', (job) => {

      log.info(`onchain.${boostpow}.job`, job)

    })

    const askbitcoin = onchain(app_id)

    askbitcoin.on('*', (event) => {

      log.info(`onchain.${app_id}.event`, event)

    })

    askbitcoin.on('question', (value) => {

      log.info(`onchain.${app_id}.question`, value)

    })

    askbitcoin.on('answer', (value) => {

      log.info(`onchain.${app_id}.answer`, value)

    })

    askbitcoin.on('error', (error) => {

      log.error(`onchain.${app_id}.error`, error)

    })

  }

}

if (require.main === module) {

  start()

}
