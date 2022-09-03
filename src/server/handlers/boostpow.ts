
import config from '../../config'

import {log} from '../../log'

import { BoostPowJob } from 'boostpow'

import * as moment from 'moment'

import { quoteDifficulty } from '../../prices'

import { badRequest } from 'boom'
import * as models from '../../models'

import { sequelize } from '../../models'

import { Op } from 'sequelize'

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

export async function jobs(req, h) {

  const limit = req.query.limit || 100

  const order_by = req.query.order_by || 'timestamp'

  const order_direction = req.query.order_direction || 'desc'

  const offset = req.query.offset || 0

  const where  = {}

  if (req.query.content) {

    where['content'] = req.query.content
  }

  if (req.query.txid) {

    where['txid'] = req.query.txid
  }

  if (req.query.tag) {

    where['tag'] = req.query.tag
  }

  if (req.query.category) {

    where['category'] = req.query.category
  }

  if (req.query.start_timestamp) {

    where['timestamp'] = {
      [Op.gte]: req.query.start_timestamp
    }

  }

  if (req.query.end_timestamp) {

    where['timestamp'] = {
      [Op.lte]: req.query.end_timestamp
    }
    
  }

  const order: any = [[order_by, order_direction]]

  const findAll = {

    where,

    order,

    limit,

    offset,

    include: [{
      model: models.BoostpowProof,
      as: 'proof',
      required: true
    }]

  }

  log.info('models.BoostpowJob.findAll', findAll)

  try {

    const jobs = await models.BoostpowJob.findAll(findAll)

    return { jobs }

  } catch(error) {

    log.error(error)

    return badRequest(error)

  }

}

export async function proofs(req, h) {

  const limit = req.query.limit || 100

  const order_by = req.query.order_by || 'timestamp'

  const order_direction = req.query.order_direction || 'desc'

  const where  = {}

  if (req.query.start_timestamp) {

    where['timestamp'] = {
      [Op.gte]: req.query.start_timestamp
    }

  }

  if (req.query.end_timestamp) {

    where['timestamp'] = {
      [Op.lte]: req.query.end_timestamp
    }
    
  }

  const order: any = [[order_by, order_direction]]

  const findAll = {

    where,

    order,

    limit,

    offset

  }

  log.info('models.BoostpowProof.findAll', findAll)

  try {

    const proofs = await models.BoostpowProof.findAll(findAll)

    return { proofs }

  } catch(error) {

    log.error(error)

    return badRequest(error)

  }

}
