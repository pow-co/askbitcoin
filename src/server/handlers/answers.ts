
import { badRequest, notFound } from 'boom'

import { log } from '../../log'

import { models, sequelize } from '../../models'

import * as moment from 'moment'

import { Op } from 'sequelize'
import { importAnswersByTxHex, importAnswersByTxid } from '../../answers'

export async function create(req, h) {

}

export async function createByTxid(req, h) {

  const answers = await importAnswersByTxid(req.params.txid)

  return { answers }

}

export async function createByTxhex(req, h) {

  const answers = await importAnswersByTxHex(req.params.transaction)

  return { answers }

}

export async function build(req, h) {

}

export async function index(req, h) {

  const where = {}

  const query = {
    timestamp: {}
  }

  if (req.query.start_timestamp) {

    const start_timestamp =req.query.start_timestamp

    console.log('START TIMESTAMP', start_timestamp)

    where['timestamp'] = {
      [Op.gte]: start_timestamp
    }

    query['timestamp']['>='] = start_timestamp

  }

  if (req.query.end_timestamp) {

    const end_timestamp = req.query.end_timestamp

    console.log('END TIMESTAMP', end_timestamp)

    where['timestamp'] = {
      [Op.lte]: end_timestamp
    }

    query['timestamp']['<='] = end_timestamp

  }

  try {

    const proofs = await models.BoostpowProof.findAll({

      where,

      attributes: [
        'content_tx_id',
        [sequelize.fn('sum', sequelize.col("difficulty")), "difficulty"],
        [sequelize.fn('count', sequelize.col("id")), "count"],
      ],

      group: 'content_tx_id',

      order: [['difficulty', 'desc']],

    })

    const answersWhere = Object.assign(query, {
      tx_id: {
        [Op.in]: proofs.map(proof => proof.content_tx_id)
      }
    })
    
    const answers = await models.Answer.findAll({
      where: answersWhere,
      include: [{
        model: models.Question,
        as: 'question'
      }]
    })

    const answersMap = answers.reduce((map, answer) => {
      map[answer.tx_id] = answer;
      return map;
    }, {})

    const result = proofs.map(proof => {

      const answer = answersMap[proof.content_tx_id]

      if (!answer) {
        return null
      }

      const json = answer.toJSON()

      json.timestamp = moment(json.timestamp).unix()

      return Object.assign(json, { difficulty: parseFloat(proof.difficulty), count: parseInt(proof.count) })
      
    })
    .filter(item => !!item) // only proofs with associated questions

    return {

      query,

      answers: result

    }

  } catch(error) {

    log.error('http.api.handlers.questions.index.error', error)

    console.error('http.api.handlers.questions.index.error', error)

    return badRequest(error)

  }

}

export async function recent(req, h) {

  const limit = req.query.limit || 100

  const offset = req.query.offset || 0

  try {

    const answers = await models.Answer.findAll({
      order: [['timestamp', 'desc']],
      limit,
      offset,
      include: [{
        model: models.Question,
        as: 'question'
      }, {
        model: models.BoostpowProof,
        as: 'boostpow_proofs'
      }]
    })

    return {

      answers

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {
  value: any;
}

export async function show(req, h) {

  try {

    const where = {}

    const query = {
      timestamp: {}
    }
  
    if (req.query.start_timestamp) {
  
      where['timestamp'] = {
        [Op.gte]: req.query.start_timestamp
      }
  
      query['timestamp']['>='] = req.query.start_timestamp
  
    }
  
    if (req.query.end_timestamp) {
  
      where['timestamp'] = {
        [Op.lte]: req.query.end_timestamp
      }
  
      query['timestamp']['<='] = req.query.end_timestamp
  
    }  

    console.log('PARAMS', req.params)

    let answer = await models.Answer.findOne({

      where: { tx_id: req.params.tx_id },

      include: [{
        model: models.Question,
        as: 'question'
      }]

    })

    console.log("ANSWER 0", answer)

    if (!answer) {

      await importAnswersByTxid(req.params.tx_id)

      answer = await models.Answer.findOne({

        where: { tx_id: req.params.tx_id },

        include: [{
          model: models.Question,
          as: 'question'
        }]

      })
    }

    if (!answer) {

      return notFound()

    }

    return { query, answer }

  } catch(error) {

    log.error(error)

    return badRequest(error)

  }

}
