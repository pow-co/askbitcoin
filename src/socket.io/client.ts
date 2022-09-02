
const io = require('socket.io-client')

import { Socket } from 'socket.io-client'

import { log } from '../log'

export async function connectClient(url: string): Promise<Socket> {

  let socket = io(url, {
    transports: ['websocket']
  })

  socket.on('connect', () => {

    log.info('socket.io-client.connected')

  })

  socket.onAny((event, ...args) => {
    
    console.log('socket.io-client', {
      type: event,
      payload: args[0]
    })  
  })

  return socket;

}
