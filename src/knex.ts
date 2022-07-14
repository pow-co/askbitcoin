
import * as configs from '../knexfile'

//const config = configs[process.env.NODE_ENV]

//export const knex = require('knex')(config)

export const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: `${process.cwd()}/.rabbi/onchain.sqlite`
  },
  useNullAsDefault: true
});

