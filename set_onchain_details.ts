
require('dotenv').config()

import { findOrCreate } from './src/onchain'

async function run() {

  const tokenResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_token',
      author: process.env.BSV_IDENTITY_ADDRESS
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_token',
      val: {
        origin: 'e27f2c9d8f2d32a22c2c1c8f9ff76d5cbf859b3584c2fed539ddb758f38c8807_o2',
        type: 'run'
      }
    }
  })

  console.log(tokenResult)

  const domainResult = await findOrCreate({
    where: {
      app: 'midasvalley.net',
      type: 'set_domain'
    },
    defaults: {
      app: 'midasvalley.net',
      key: 'set_domain',
      val: {
        origin: 'askbitcoin.ai'
      }
    }
  })

  console.log({ domainResult })

}

run()

