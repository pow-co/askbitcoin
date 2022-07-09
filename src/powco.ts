
import { Transaction } from 'bsv'

import { run } from './run'

export async function getTransaction(txid: string): Promise<Transaction> {

  let hex = await run.blockchain.fetch(txid)

  return new Transaction(hex)

}
