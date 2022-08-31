
import * as configs from '../knexfile'

const env = process.env.NODE_ENV || 'development'

const config = configs[env]

export const knex = require('knex')(config)

