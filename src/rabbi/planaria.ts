
import { EventEmitter } from 'events'

import * as split2 from 'split2'

import * as through2 from 'through2'

import fetch from 'node-fetch';

import config from '../config'

interface CrawlerParams {
  query: any;
  onTransaction: Function;
}

export class Crawler extends EventEmitter{

  query: string;

  onTransaction: Function;

  constructor(params: CrawlerParams) {
    super()
    this.query = params.query
    this.onTransaction = params.onTransaction
  }

  start() {

    fetch("https://txo.bitbus.network/block", {
      method: "post",
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'token': config.get('planaria_token')
      },
      body: JSON.stringify(this.query)
    })
    .then(async (res) => {
      res.body
        .pipe(split2())
        .pipe(through2(async (chunk, enc, callback) => {

          let json = JSON.parse(chunk.toString())

          this.emit('chunk', json)
          await this.onTransaction(json)
          callback()
        }))

     })

    return this

  }

}

