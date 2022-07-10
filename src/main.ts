
import config from './config'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import { sync_boost_orders, sync_ask_bitcoin } from './planaria'

export async function start() {

  console.log('askbitcoin.start')

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

  }

}

if (require.main === module) {

  start()

}
