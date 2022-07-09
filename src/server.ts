
require('dotenv').config()

import config from './config'

import { Server } from '@hapi/hapi'

import { log } from './log'

import { join } from 'path'

const Joi = require('joi')

const Pack = require('../package');

import { load } from './server/handlers'

const handlers = load(join(__dirname, './server/handlers'))

export const server = new Server({
  host: config.get('host'),
  port: config.get('port'),
  routes: {
    cors: true,
    validate: {
      options: {
        stripUnknown: true
      }
    }
  }
});

if (config.get('prometheus_enabled')) {

  log.info('server.metrics.prometheus', { path: '/metrics' })

  const { register: prometheus } = require('./metrics')

  server.route({
    method: 'GET',
    path: '/metrics',
    handler: async (req, h) => {
      return h.response(await prometheus.metrics())
    },
    options: {
      description: 'Prometheus Metrics about Node.js Process & Business-Level Metrics',
      tags: ['api', 'system']
    }
  })

}

const Question = Joi.object().label('Question')
const Questions = Joi.array().items(Question).label('Questions')

const Answer = Joi.object({ }).label('Answer')
const Answers = Joi.array().items(Answer).label('Answers')

const Link = Joi.object({
  name: Joi.string().required(),
  href: Joi.string().required()
}).label('Link')
const Links = Joi.array().items(Link).label('Links')

const Output = Joi.object({
  script: Joi.string().required(),
  value: Joi.number().optional()
}).label('Output')

const Outputs = Joi.array().items(Output).label('Outputs')

server.route({
  method: 'GET',
  path: '/api/v0/status',
  handler: handlers.Status.index,
  options: {
    description: 'Simply check to see that the server is online and responding',
    tags: ['api', 'system'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        status: Joi.string().valid('OK', 'ERROR').required(),
        error: Joi.string().optional()
      }).label('ServerStatusResponse')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/questions/new',
  handler: handlers.Questions.build,
  options: {
    description: 'Returns required Transaction Outputs for a AskBitcoinQuestion',
    tags: ['api', 'questions'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('BuildQuestionResponse')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/answers/new',
  handler: handlers.Answers.build,
  options: {
    description: 'Returns required Transaction Outputs for a AnswerQuestionOutput',
    tags: ['api', 'answers'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('BuildNewAnswer')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/questions',
  handler: handlers.Questions.create,
  options: {
    description: 'Submit signed bitcoin transaction containing AskQuestion',
    tags: ['api', 'questions'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('AskQuestionTransaction')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/answers',
  handler: handlers.Answers.create,
  options: {
    description: 'Submit signed bitcoin transaction containing AnswerQuestion',
    tags: ['api', 'answers'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('AnswerQuestionTransaction')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/answers',
  handler: handlers.Answers.index,
  options: {
    description: 'List all Answers Ranked by Proof of Work',
    tags: ['api', 'answers'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        answers: Answers.required()
      }).label('ListAnswersResponse')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/questions',
  handler: handlers.Questions.index,
  options: {
    description: 'List all Questions Ranked by Proof of Work',
    tags: ['api', 'questions'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        questions: Questions.label('Questions').required()
      }).label('ListQuestionsResponse')
    }
  }
})


server.route({
  method: 'GET',
  path: '/api/v1/questions/{txid}',
  handler: handlers.Questions.show,
  options: {
    description: 'Show a Question with Answers and Work',
    tags: ['api', 'questions'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        question: Questions.required(),
        answers: Answers.required(),
        work: Joi.number().required(),
        links: Links.required()
      }).label('ShowQuestionResponse')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/answers/{txid}',
  handler: handlers.Answers.show,
  options: {
    description: 'Show an Answers with Question and Work',
    tags: ['api', 'answers'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        question: Question,
        answer: Answer,
        work: Joi.number(),
        links: Links
      }).label('ShowAnswerResponse')
    }
  }
})

var started = false

export async function start() {

  if (started) return;

  started = true

  if (config.get('swagger_enabled')) {

    const swaggerOptions = {
      info: {
        title: 'Ask Bitcoin API',
        version: Pack.version,
        description: 'Ask Bitcoin a Question - Bitcoin AI Ranks the Top Answers'
      },
      schemes: ['https'],
      host: 'https://askbitcoin.ai',
      documentationPath: '/',
      grouping: 'tags'
    }

    const Inert = require('@hapi/inert');

    const Vision = require('@hapi/vision');

    const HapiSwagger = require('hapi-swagger');

    await server.register([
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: swaggerOptions
        }
    ]);

    log.info('server.api.documentation.swagger', swaggerOptions)
  }

  await server.start();

  log.info(server.info)

  return server;

}

if (require.main === module) {

  start()

}
