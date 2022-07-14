#!/usr/bin/env ts-node

import { program } from 'commander'

import * as bsv from 'bsv'

const { version } = require('../../package')

import { run } from '../run'

import { log } from '../log'

import * as boostpow from 'boostpow'

import * as AskBitcoin from '..'

import { BigNumber } from 'bignumber.js'

//import { onchain, config, prices } from '..'

import * as prices from '../prices'
import config from '../config'
import * as onchain from '../rabbi/onchain'

import { fromTx } from 'txo'

async function loadWallet() {

  const private_key = config.get('ask_bitcoin_user_private_key')

  if (!private_key){ 
    throw new Error('ask_bitcoin_user_private_key variable must be set')
  }

  const wallet = new onchain.Wallet(private_key)

  await wallet.sync()

  return wallet
  /*
  */

}

program
  .version(version)
  .option('--config <path>')
  .option('--onchain_app_id <string>')
  .option('--ask_bitcoin_user_private_key <string>')
  .option('--start <timestamp>')
  .option('--end <timestamp>')

program
  .command('wallet [currency]')
  .action(async (currency='USD') => {

    try {

      const wallet: any = await loadWallet()

      const value = await prices.convert(wallet.balance, currency)

      console.log({
        address: wallet.address,
        balance: wallet.balance,
        outputs: wallet.utxos.length,
        price: { currency, value}
      })

    } catch(error) {

      console.error(error)

      process.exit(1) 

    }

    process.exit(0)

  })

program
  .command('list_questions')
  .action(async () => {

    //let client = new Client({url: 'http://localhost:5200'})

    //let questions = client.listQuestions()

    let questions = await AskBitcoin.questions.list()

    console.log(questions)

    process.exit(0)

  })


program
  .command('ask_question <question> [broadcast]')
  .action(async (question, broadcast=true) => {

    const wallet = await loadWallet()

    let result: AskBitcoin.Question = await AskBitcoin.questions.ask(wallet, question, { broadcast })

    console.log(result)

    process.exit(0)

  })

program
  .command('publish_onchain <key> <value>')
  .action(async (key, value={}) => {

    try {

      JSON.parse(value)

    } catch(error) {

      if (error) {
        console.error('Value must be valid JSON string')
      }

      process.exit(1)

    }

    const wallet = await loadWallet()

    let tx = await wallet.publish(key, JSON.parse(value))

    console.log(tx)
    console.log(tx.serialize())

    const txo = await fromTx(tx)

    console.log(txo)

    process.exit(0)

  })


program
  .command('view_answers <question_txid>')
  .action(async (txid) => {

    let question: AskBitcoin.Question = await AskBitcoin.questions.find(txid)
    
    let answers: AskBitcoin.Answer[] = await AskBitcoin.answers.list({ question })

    process.exit(0)

  })

program
  .command('answer_question <question_id> <answer>')
  .action(async (question_id, content) => {

    const wallet = await loadWallet()

    var tx_id, tx_index;

    if (question_id.match('_')) {

      [tx_id, tx_index] = question_id.split('_')

      tx_index = tx_index.replace('o', '')

    } else {

      tx_id = question_id

    }

    let answer: AskBitcoin.Answer = await AskBitcoin.questions.answer(wallet, {
      question: {
        content: '',
        transaction: {
          txid: tx_id
        }
      },
      content
    })

    console.log(answer)

    process.exit(0)

  })

interface CreateBoostPowTransaction {
  content_tx_id: string;
  content_tx_index: number;
  difficulty: number;
  satoshis: number;
  tag?: string;
}

function createBoostpowTransaction(params: CreateBoostPowTransaction): bsv.Transaction {

  const { content_tx_id, content_tx_index, difficulty, satoshis, tag } = params

  const job = boostpow.Job.fromObject({
    content: content_tx_id,
    diff: difficulty,
    tag: tag
  })

  const transaction = new bsv.Transaction()

  const asm = job.toASM()

  console.log({ asm })

  const script = bsv.Script.fromASM(asm)

  const output = new bsv.Transaction.Output({
    script,
    satoshis: params.satoshis
  })

  console.log({ output })

  transaction.addOutput(output)

  console.log('S', transaction.serialize(true))

  /*const op_return = bsv.Script.buildSafeDataOut([
    'onchain',
    config.get('boostpow_onchain_app_id'),
    'job',
    JSON.stringify({ tx_index: 0 })
  ])

  transaction.addOutput(new bsv.Transaction.Output({
    script: op_return,
    satoshis: 0
  }))
  */

  return transaction

}

program
  .command('boost <content_tx_id> <content_tx_index> <value> [currency]')
  .action(async (content_tx_id, content_tx_index, value, currency='USD') => {

    // create boostpow transaction
    // start mining if below a certain threshold

    const { satoshis, difficulty } = await prices.quoteDifficulty({ currency, value })

    console.log({ satoshis, difficulty })

    let transaction = createBoostpowTransaction({ content_tx_id, content_tx_index, difficulty, satoshis })

    console.log(transaction.serialize(true))

    const wallet: any = await loadWallet()

    transaction.from(wallet.utxos)

    transaction.change(wallet.address)

    transaction.sign(wallet.private_key)

    console.log({ transaction })

    console.log('SERIALIZE')

    const hex = transaction.serialize(true)

    console.log({ hex })

    console.log({ hex, txid: transaction.hash })

    let result = await run.blockchain.broadcast(hex)

    log.info('run.blockchain.broadcast.result', { result })

    //main()

  })

program.parse(process.argv)

