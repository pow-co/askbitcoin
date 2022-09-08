
import * as http from 'superagent'

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

  console.log('GET TIMESTAMP BODY', body)

  return new Date(parseInt(body.time) * 1000)

}
