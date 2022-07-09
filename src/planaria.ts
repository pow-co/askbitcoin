require("dotenv").config()

import { Crawler } from './rabbi/planaria'

import { log } from './log'

import config from './config'

export async function sync_boost_orders() {

  const block_height_start = 738000

  const crawler = new Crawler({

    query: {
      q: {
        find: { "out.s0": "boostpow", "blk.i": { "$gt": block_height_start } },
      }
    },

    onTransaction: (json) => {

      log.info('planaria.json', json)

    }
  })

  crawler.start()

}

export async function sync_askbitcoin() {

  const block_height_start = 738000

  const crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('onchain_app_identifier'),
          "blk.i": {
            "$gt": block_height_start
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('planaria.json', json)

    }
  })

  crawler.start()

}

export async function sync_boostpow_onchain() {

  const block_height_start = 738000

  const crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('boostpow_onchain_app_identifier'),
          "blk.i": {
            "$gt": block_height_start
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('planaria.json', json)

    }
  })

  crawler.start()

}

