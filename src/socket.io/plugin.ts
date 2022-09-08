require('dotenv').config()

import * as socketio from 'socket.io'

import { Server } from '@hapi/hapi'

import { log } from '../log'

import { Actor } from 'rabbi'

import { connectClient } from './client'

import events from '../events'
import config from '../config'
import { sync_ask_bitcoin } from '../planaria'

export const plugin = (() => {

  return {

    name: 'socket.io',

    register: async function(server: Server, options, next): Promise<socketio.Server> {

      const path = '/v1/socketio'

      //const io = socketio(server.listener, { path })
      const io: socketio.Server = new socketio.Server(server.listener)

      log.info('socket.io.started', { path })

      io.use(async (socket: socketio.Socket, next) => {

        // authenticate here

        next()

      })

      io.on('connection', async function(socket: socketio.Socket) {

        const { address } = socket.handshake

        log.info('socket.io.connection', { address })

        socket.on('disconnect', () => {

          log.info('socket.io.disconnect', socket.data)

        })

      })

      if (config.get('amqp_enabled')) {

        Actor.create({

          exchange: 'powco',
  
          routingkey: 'askbitcoin.question.created',
  
          queue: 'askbitcoin_question_created_broadcast_websockets',
  
        })
        .start(async (channel, msg, json) => {
  
          io.emit('askbitcoin.question.created', json)
  
          channel.ack(msg);
  
        });
  
        Actor.create({
  
          exchange: 'powco',
  
          routingkey: 'askbitcoin.answer.created',
  
          queue: 'askbitcoin_answer_created_broadcast_websockets',
  
        })
        .start(async (channel, msg, json) => {
  
          io.emit('askbitcoin.answer.created', json)
  
          channel.ack(msg);
  
        });
  
        Actor.create({
  
          exchange: 'powco',
  
          routingkey: 'boostpow.job.created',
  
          queue: 'askbitcoin_boostpow_job_created_broadcast_websockets',
  
        })
        .start(async (channel, msg, json) => {
  
          io.emit('boostpow.job.created', json)
  
          channel.ack(msg);
  
        });
  
        Actor.create({
  
          exchange: 'powco',
  
          routingkey: 'boostpow.proof.created',
  
          queue: 'askbitcoin_boostpow_proof_created_broadcast_websockets',
  
        })
        .start(async (channel, msg, json) => {
  
          io.emit('boostpow.proof.created', json)
  
          channel.ack(msg);
  
        });
  
      }

      events.on('answer.created', json => io.emit('askbitcoin.answer.created', json))
      
      events.on('question.created', json => io.emit('askbitcoin.question.created', json))

      return io;

    }


  }

})()

if (require.main === module) {

  (async () => {

    const host = process.env.HOST || "localhost";

    const port = process.env.PORT || 8001

    const server = new Server({
      host,
      port,
      routes: {
        cors: true
      }
    });

    const io = await server.register(plugin)

    log.info('socket.io.server.start')

    await server.start();
    
    log.info('socket.io.server.started', server.info)

    setInterval(() => {

      if (io && io.emit) {

        io.emit('badcat', { eyes: 'green', mouth: 'smirk', posture: 'erect' })

      }

    }, 2500)

    //await connectClient(`ws://${host}:${port}`)
    await connectClient(`wss://askbitcoin.ai`)

  })()

}

