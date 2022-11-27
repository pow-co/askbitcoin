
import { badRequest, notFound } from 'boom'

import { importQuestionsByTxHex, importQuestionsByTxid } from '../../questions'

import { models, sequelize } from '../../models'

import { Op } from 'sequelize'

import { log } from '../../log'

import * as moment from 'moment'

export async function create(req, h) {

  try {

    let question = await importQuestionsByTxHex(req.payload.transaction)

    return {

      question

    }

  } catch(error) {

    return badRequest(error)

  }

}
export async function createByTxid(req, h) {

  const questions = await importQuestionsByTxid(req.params.txid)

  return { questions }

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
        [sequelize.fn('count', 1), "count"],
      ],

      group: 'content_tx_id',

      order: [['difficulty', 'desc']]

    })

    const questions = await models.Question.findAll({
      where: {
        tx_id: {
          [Op.in]: proofs.map(proof => proof.content_tx_id)
        }
      },

      include: [{
        model: models.Answer,
        as: 'answers',
        include: [{
          model: models.BoostpowProof,
          as: 'boostpow_proofs'
        }]
      }]
    })

    const questionsMap = questions.reduce((map, question) => {
      map[question.tx_id] = question;
      return map;
    }, {})

    const result = proofs.map(proof => {

      const question = questionsMap[proof.content_tx_id]

      if (!question) {
        return null
      }

      const json = question.toJSON()

      json.timestamp = moment(json.timestamp).unix()

      return Object.assign(json, { difficulty: parseFloat(proof.difficulty), count: parseInt(proof.count) })
      
    })
    .filter(item => !!item) // only proofs with associated questions

    return {

      query,

      questions: result

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

    const questions = await models.Question.findAll({
      order: [['timestamp', 'desc']],
      limit,
      offset,
      include: [{
        model: models.Answer,
        as: 'answers',
        include: [{
          model: models.BoostpowProof,
          as: 'boostpow_proofs'
        }]
      }, {
        model: models.BoostpowProof,
        as: 'boostpow_proofs'
      }]
    })

    return {

      questions

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {

}

interface Question {

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

    const question = await models.Question.findOne({

      where: { tx_id: req.params.tx_id },

      include: [{
        model: models.Answer,
        as: 'answers',
        include: [{
          model: models.BoostpowProof,
          as: 'boostpow_proofs',
          where,
          required: false
        }]
      }]

    })

    if (!question) {

      return notFound()

    }

    return { query, question }

  } catch(error) {

    log.error(error)

    return badRequest(error)

  }

}

export async function showByStub(req, h) {

  try {

    let question = await models.Question.findOne({

      where: {

        url_stub: req.params.question_stub

      },

      order: [['timestamp', 'asc']]

    })

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

    question = await models.Question.findOne({

      where: { tx_id: question.tx_id },

      include: [{
        model: models.Answer,
        as: 'answers',
        include: [{
          model: models.BoostpowProof,
          as: 'boostpow_proofs',
          where,
          required: false
        }]
      }]

    })

    if (!question) {

      return notFound()

    }

    return { query, question }



  } catch(error) {

    log.error('questions.show-by-stub.error', error)

    return badRequest(error)

  }

}
