#!/usr/bin/env ts-node

const { version } = require('../../package')

import { program } from 'commander'

import { start as server } from '../server'

import { start as actors } from '../rabbi/actors'

import { start as main } from '../main'

import * as askBitcoin from '../'


program
  .version(version)
  .option('--config <path>')
  .option('--onchain_app_id <string>')
  .option('--start <timestamp>')
  .option('--end <timestamp>')

program
  .command('list_questions')
  .action(async () => {

    let questions = await askBitcoin.questions.list()

    console.log(questions)

    process.exit(0)

  })

program
  .command('ask_question')
  .action(async () => {

    let question: askBitcoin.Question = await askBitcoin.questions.ask('')

    console.log(question)

    process.exit(0)

  })

program
  .command('view_answers <question_txid>')
  .action(async (txid) => {

    let question: askBitcoin.Question = await askBitcoin.questions.find(txid)
    
    let answers: askBitcoin.Answer[] = await askBitcoin.answers.list({ question })

    process.exit(0)

  })

program
  .command('answer_question')
  .action(async () => {

    let question = await askBitcoin.questions.find('')

    let answer: askBitcoin.Answer = await askBitcoin.questions.answer({
      question,
      content: ''
    })

    console.log(answer)

    process.exit(0)

  })

program
  .command('start')
  .action(() => {

    main()

  })
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

program.parse(process.argv)

