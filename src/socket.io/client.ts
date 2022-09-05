
const io = require('socket.io-client')

import { Socket } from 'socket.io-client'

import { log } from '../log'

function onAny(event, ...args) {

  console.log('socket.io-client', {
    type: event,
    payload: args[0]
  })  

}

export async function connectClient(url: string): Promise<Socket> {

  let socket = io(url, {
    transports: ['websocket']
  })

  socket.on('connect', () => {

    log.info('socket.io-client.connected')

    socket.emit('ready')

  })

  socket.onAny(onAny)

  onAny('socket.io.client.connect', new Date())

  return socket;

}
