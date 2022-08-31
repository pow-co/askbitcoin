
require('dotenv').config()

import config from './config'

import { Server } from '@hapi/hapi'

import { log } from './log'

import { join } from 'path'

import { plugin as websockets } from './socket.io/plugin'

const Joi = require('joi')

const Pack = require('../package');

import { load } from './server/handlers'
import { connectClient } from './socket.io/client'

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

server.ext('onRequest', function(request, h) {

  log.debug('server.request', { id: request.info.id, headers: request.headers })

  if ('application/payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/payment';
  }

  if ('application/payment' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/payment';
  }

  if ('application/bitcoinsv-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/bitcoinsv-payment';
  }

  if ('application/dash-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/dash-payment';
  }

  if ('application/dash-payment' === request.headers['accept']) {
    request.headers['accept'] = 'application/json';
    request.headers['x-accept'] = 'application/dash-payment';
  }

  if ('application/dash-paymentack' === request.headers['accept']) {
    request.headers['accept'] = 'application/json';
    request.headers['x-accept'] = 'application/dash-paymentack';
  }

  if ('application/bitcoinsv-paymentack' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/bitcoinsv-payment';
    request.headers['x-accept'] = 'application/bitcoinsv-paymentack';
  }

  if ('application/verify-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/verify-payment';
  }

  if ('application/verify-payment' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/verify-payment';
  }

  return h.continue;
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
  path: '/api/v1/recent/answers',
  handler: handlers.Answers.recent,
  options: {
    description: 'List most recently posted Answers by timestamp',
    tags: ['api', 'answers'],
    validate: {
      query: Joi.object({
        limit: Joi.number().integer().optional()
      })
      .label('RecentAnswersQuery')
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        questions: Answers.label('Answers').required()
      }).label('RecentAnswers')
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
    validate: {
      query: Joi.object({
        start_timestamp: Joi.number().integer().optional(),
        end_timestamp: Joi.number().integer().optional()
      })
      .label('ListQuestionsQuery')
    },
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
  path: '/api/v1/recent/questions',
  handler: handlers.Questions.recent,
  options: {
    description: 'List most recently posted Questions by timestamp',
    tags: ['api', 'questions'],
    validate: {
      query: Joi.object({
        limit: Joi.number().integer().optional()
      })
      .label('RecentQuestionsQuery')
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        questions: Questions.label('Questions').required()
      }).label('RecentQuestions')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/questions/{tx_id}',
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
  path: '/api/v1/answers/{tx_id}',
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

server.route({
  method: 'GET',
  path: '/api/v1/boostpow/{tx_id}/new',
  handler: handlers.Boostpow.build,
  options: {
    description: 'Create new Boost Pow job script for payment',
    tags: ['api', 'boostpow'],
    validate: {
      query: Joi.object({
        currency: Joi.string().default('USD').optional(),
        value: Joi.number().default(0.05).optional()
      }).label('NewBoostPowOptions'),
      params: Joi.object({
        tx_id: Joi.string().required()
      })
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        network: Joi.string().required(),
        outputs: Joi.array().items(Joi.object({
          script: Joi.string().required(),
          amount: Joi.number().integer().required()
        }).required().label('PaymentRequestOutput')).required(),
        creationTimestamp: Joi.number().integer().required(),
        expirationTimestamp: Joi.number().integer().required(),
        memo: Joi.string().optional(),
        paymentUrl: Joi.string().required(),
        merchantData: Joi.string().optional()
      })
        
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/transactions',
  handler: handlers.Transactions.create,
  options: {
    description: 'Submit new, signed transactions to the network',
    tags: ['api', 'transactions'],
    validate: {
      failAction: 'log',
      payload: Joi.object({
        transaction: Joi.string().required()
      }).label('SubmitTransaction')
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        payment: Joi.string().required(),
        memo: Joi.string().optional(),
        error: Joi.number().optional()
      }).label('PaymentAck')
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
      documentationPath: '/api',
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

    await server.register(websockets)

    await connectClient(`ws://${config.get('host')}:${config.get('port')}`)

    if (config.get('webui_enabled')) {

      const H2o2 = require('@hapi/h2o2');

      log.debug('webui.enabled')

      await server.register(H2o2);

      server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            proxy: {
                host: config.get('webui_host'),
                port: config.get('webui_port'),
                protocol: 'http',
                passThrough: true
            }
        }
      });

    }

  }

  await server.start();

  log.info(server.info)

  return server;

}

if (require.main === module) {

  start()

}
