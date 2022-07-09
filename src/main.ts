
import config from './config'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import { sync as planaria_sync_boost } from './planaria'

export async function start() {

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  if (config.get('planaria_sync_boost')) {

    planaria_sync_boost();

  }

}

if (require.main === module) {

  start()

}
