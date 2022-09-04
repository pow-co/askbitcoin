
import { badRequest, notFound } from 'boom'

import { log } from '../../log'

import { loadQuestion } from '../../questions'

import { loadAnswer } from '../../answers'

import { models, sequelize } from '../../models'

import * as moment from 'moment'

import { Op } from 'sequelize'

export async function create(req, h) {

}

export async function build(req, h) {

}

export async function index(req, h) {

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
    
    const answers = await models.Answer.findAll({
      where: {
        tx_id: {
          [Op.in]: proofs.map(proof => proof.content_tx_id)
        }
      },

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

    const answer = await models.Answer.findOne({

      where: { tx_id: req.params.tx_id },

      include: [{
        model: models.BoostpowProof,
        as: 'boostpow_proofs',
        where
      }, {
        model: models.BoostpowJob,
        as: 'boostpow_jobs',
        where: {
          proof_tx_id: null
        }
      },{
        model: models.Question,
        as: 'question'
      }]

    })

    if (!answer) {

      return notFound()

    }

    return { query, answer }

  } catch(error) {

    log.error(error)

    return badRequest(error)

  }

}