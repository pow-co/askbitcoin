require("dotenv").config()

//import { Crawler } from './rabbi/planaria'
import { Crawler } from '/Users/zyler/github/rabbijs/rabbi/lib/planaria'

//import { CrawlerBase } from '/Users/zyler/github/powe-co/nucleic'

import { log } from './log'

import config from './config'

import { leveldb } from './rabbi/onchain'

import { run } from './run'

/*class OnchainCrawler extends CrawlerBase {

  app: string;

  key: string;

  constructor(params: {token: string, app: string, key:string}) {

    super(params.token)

    this.app = params.app;
    this.key = params.key
  }

  onTransaction(tx) {

    console.log(tx)

  }

}


let occ = new OnchainCrawler({
  app: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN',
  key: 'questin',
  token: config.get('planaria_token')
})

occ.start()
*/

export async function sync_boost_orders() {

  const block_height_start = 0

  const crawler = new Crawler({

    query: {
      q: {
        find: { "out.s0": "boostpow", "blk.i": { "$gt": block_height_start } },
      }
    },

    onTransaction: async (json) => {

      let hash = json['tx']['h']

      leveldb.get(hash, async (error, hex) => {

        if (!hex) {

          hex = await run.blockchain.fetch(hash)

        }

        //console.log({ hex, hash })

        await leveldb.put(hash, hex)

      })

    }
  })

  crawler.start()

}

export async function sync_ask_bitcoin() {

  console.log({ sync_ask_bitcoin })

  const block_height_start = 738000

  const app_id = config.get('askbitcoin_onchain_app_id')

  const crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s2": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        let message = {
          app: output['s3'],
          key: output['s4'],
          value: JSON.parse(output['s5'])
        }

        console.log(message)

      })


    }
  })

  crawler.start()

}

export async function sync_boostpow_onchain() {

  const block_height_start = 738000

  const boostpow_jobs_crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('powco_onchain_app_id'),
          "out.s2": "boostpow.job",
          "blk.i": {
            "$gt": block_height_start
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('onchain.powco.boost.job.json', json)

    }
  })

  const proofs_start_height = 738000

  const boostpow_proofs_crawler = new Crawler({

    query: {
      q: {
        find: {
          "out.s0": "onchain",
          "out.s1": config.get('powco_onchain_app_id'),
          "out.s2": "boostpow.proof",
          "blk.i": {
            "$gt": proofs_start_height
          }
        },
      }
    },

    onTransaction: (json) => {

      log.info('onchain.powco.boost.proof.json', json)

    }

  })

  boostpow_proofs_crawler.start()

  boostpow_jobs_crawler

}

