
import * as bsv from 'bsv'

import { getTransaction } from './powco';

import { run } from './run'

export interface Transaction {
  txid: string;
  hex?: string;
}

// ensures the transaction is either already in the mempool / blockchain
// or if not broadcasts the transaction in the mempool

export async function ensureTransaction(hex: string): Promise<bsv.Transaction> {

  const tx = new bsv.Transaction(hex)

  const transaction = await getTransaction(tx.hash)

  if (transaction) { return }

  await run.blockchain.broadcast(hex)

  return tx

}
