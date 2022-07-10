#!/usr/bin/env ts-node

import { program } from 'commander'

const { version } = require('../../package')

import * as AskBitcoin from '..'

import { onchain, config, prices } from '..'

async function loadWallet() {

  const private_key = config.get('ask_bitcoin_user_private_key')


  if (!private_key){ 
    throw new Error('ask_bitcoin_user_private_key variable must be set')
  }

  const wallet = new onchain.Wallet(private_key)

  await wallet.sync()

  return wallet

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

    const wallet = await loadWallet()

    const value = await prices.convert(wallet.balance, currency)

    console.log({
      address: wallet.address,
      balance: wallet.balance,
      outputs: wallet.utxos.length,
      price: { currency, value}
    })

    process.exit(0)

  })

program
  .command('list_questions')
  .action(async () => {

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
  .command('view_answers <question_txid>')
  .action(async (txid) => {

    let question: AskBitcoin.Question = await AskBitcoin.questions.find(txid)
    
    let answers: AskBitcoin.Answer[] = await AskBitcoin.answers.list({ question })

    process.exit(0)

  })

program
  .command('answer_question <txid> <answer>')
  .action(async (txid, content) => {

    const wallet = await loadWallet()

    let question = await AskBitcoin.questions.find(txid)

    console.log('__FOUND QUESTION', question)

    let answer: AskBitcoin.Answer = await AskBitcoin.questions.answer(wallet, {
      question,
      content
    })

    console.log(answer)

    process.exit(0)

  })


program
  .command('start')
  .action(() => {

    //main()

  })

/*

program
  .command('server')
  .action(() => {

    server()

  })

program
  .command('actors')
  .action(() => {

    actors()

  })
*/

program.parse(process.argv)

