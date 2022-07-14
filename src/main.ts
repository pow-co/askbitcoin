
import config from './config'

import { start as server } from './server'

import { knex } from './knex'

import { start as actors } from './rabbi/actors'

import { sync_boost_orders, sync_ask_bitcoin } from './planaria'

import { onchain } from './rabbi/onchain/bitsocket'

import { spawn } from 'child_process'

import { log } from './log'

export async function start() {

  await knex.migrate.latest();

  if (config.get('webui_enabled')) {

    const nextjs = spawn("npm", ["run", "start"], {

      cwd: `${process.cwd()}/web-ui`

    });

  }

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  if (config.get('sync_boost_orders')) {

    if (!process.env.PLANARIA_TOKEN) {

      throw new Error('PLANARIA_TOKEN environment variable require to sync boost orders')

    }

    sync_boost_orders();

  }

  if (config.get('sync_ask_bitcoin')) {

    if (!process.env.PLANARIA_TOKEN) {

      throw new Error('PLANARIA_TOKEN environment variable require to sync boost orders')

    }

    sync_ask_bitcoin();

    const app_id = config.get('askbitcoin_onchain_app_id')

    const boostpow = config.get('boostpow_onchain_app_id')

    onchain(boostpow).on('*', (event) => {
      log.info('onchain.boostpow.event', event)
    })

    onchain(boostpow).on('proof', ({ txid, input }) => {

      log.info(`onchain.${boostpow}.proof`, {txid, input})

      // if no txid then txid is this transaction
      // download the raw transaction
      // check to see if transaction in fact contains boost proofs

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
