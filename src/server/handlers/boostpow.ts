
import config from '../../config'

import {log} from '../../log'

import { BoostPowJob } from 'boostpow'

import * as moment from 'moment'

import { quoteDifficulty } from '../../prices'

export async function build (req, h) {

  var { currency, value } = req.query

  if (!currency) { currency = 'USD' }

  if (!value) { value = 0.05 }

  const { satoshis: amount, difficulty: diff } = await quoteDifficulty({ currency, value })

  const script = BoostPowJob.fromObject({

    content: req.params.tx_id,

    diff

  }).toHex()

  const payment_request = {
    network: 'bitcoin-sv',
    memo: `BoostPow @ AskBitcoin.AI`,
    merchantData: JSON.stringify({
      avatarUrl: 'https://avatars.githubusercontent.com/u/89090814?s=400&u=d3dd00b90c9ecaff4a1879677cf4b7753e5859a3&v=4'
    }),
    creationTimestamp: moment().unix(),
    expirationTimestamp: moment().add(1, 'hour').unix(),
    paymentUrl: `${config.get('api_base')}/api/v1/transactions`,
    outputs: [{
      script,
      amount
    }]
  }

  log.debug('boostpow.new', { payment_request })

  return payment_request

}
