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


/*program
  .command('start')
  .action(() => {

    //main()

  })
  */

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

