#!/usr/bin/env ts-node

const { version } = require('../../package')

import { program } from 'commander'

import { start as server } from '../server'

import { start as actors } from '../rabbi/actors'

import { start as main } from '../main'

program
  .version(version)
  .option('--config <path>')
  .option('--host <ipaddress>')
  .option('--port <integer>')
  .option('--prometheus_enabled <boolean>')
  .option('--amqp_enabled <boolean>')
  .option('--http_api_enabled <boolean>')
  .option('--swagger_enabled <boolean>')
  .option('--postgres_enabled <boolean>')
  .option('--database_url <connection_string>')
  .option('--amqp_url <connection_string>')
  .option('--amqp_exchange <name>')
  .option('--amqp_enabled <boolean>')

program
  .command('echo <statement>')
  .action((statement) => {

    console.log({ statement })

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
