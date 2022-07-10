
import * as levelup from 'levelup'

import * as leveldown from 'leveldown'

import config from '../config'

import * as bsv from 'bsv'

import { run } from '../run'

import * as filepay from 'filepay'

export const leveldb = levelup(leveldown(config.get('leveldb_path')))

export { Wallet } from './onchain/wallet'

