
import * as http from 'superagent'
import log from './log';

interface WhatsonchainTransaction {
  txid: string;
  hash: string;
  time: Date;
  blocktime: number;
  blockhash: string;
  vin: any[];
  vout: any[];
}

export async function getTransaction(txid: string): Promise<WhatsonchainTransaction> {

  let url =`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${txid}`

  let {body} = await http.get(url)

  body.time = new Date(parseInt(body.time) * 1000)

  return body

}

export async function getTimestamp(txid: string): Promise<Date> {

  let url =`https://api.whatsonchain.com/v1/bsv/main/tx/hash/${txid}`

  let {body} = await http.get(url)

  log.info("whatsonchain.timestamp", body)

  if (body.time) {

    return new Date(parseInt(body.time) * 1000)

  } else {
    
    return new Date()

  }

}
