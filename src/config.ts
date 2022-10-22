require('dotenv').config()

const nconf = require('nconf')

const os = require('os')

nconf.argv({
  parseValues: true,
  transform
})

nconf.env({
  parseValues: true,
  transform
})

const global_file = `/etc/rabbi/rabbi.json`

const user_file = `${os.homedir()}/.rabbi/rabbi.json`

const project_file = `${process.cwd()}/.rabbi/rabbi.json`

nconf.add('project_file', { type: 'file', file: project_file, transform })

nconf.add('user_file', { type: 'file', file: user_file, transform })

nconf.add('global_file', { type: 'file', file: global_file, transform })

export function loadFromFiles() {

  nconf.use('project_file', { type: 'file', file: project_file, transform })

  nconf.use('user_file', { type: 'file', file: user_file, transform })

  nconf.use('global_file', { type: 'file', file: global_file, transform })

}

loadFromFiles()

process.on('SIGHUP', () => {

  loadFromFiles()

})

nconf.defaults({
  sync_boost: true,
  sync_powco: false,
  notify_rocketchat: true,
  askbitcoin_onchain_app_id: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', // askbitcoin.ai
  onchain_app_id: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', // askbitcoin.ai
  powco_onchain_app_id: '15QcoZ8nsMYdYr2k2QNJ4YUzBzrTPSsKyq', // pow.co
  boostpow_onchain_app_id: "18pPQigu7j69ioDcUG9dACE1iAN9nCfowr", // boostpow
  leveldb_path: `${process.cwd()}/.rabbi/onchain_db`,

  host: '0.0.0.0',
  port: '5200',
  prometheus_enabled: true,
  http_api_enabled: true,
  swagger_enabled: true,
  postgres_enabled: true,
  amqp_enabled: false,
  loki_enabled: false,
  webui_enabled: true,
  webui_host: '127.0.0.1',
  webui_port: 3000,
  sync_ask_bitcoin: true,
  ask_bitcoin_user_private_key: null,
  planaria_token: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxRlRyUWRaRjczd21tSFpVbzRhQzI1a0JWNUprWFRoeGl3IiwiaXNzdWVyIjoiZ2VuZXJpYy1iaXRhdXRoIn0.SHovaVkvTncvNmI0M1Q4WFZ0Ulk2SHdEMXQzOGM1RHJkVTFoTEYyLzhJeEhGZzJsSDQxeldzRG1vdUttemJPb2pJTXd4aVM5Qk9VNjFQNUhJK2x6bUxNPQ',
  api_base: 'https://askbitcoin.ai',
  boostpow_miner_address: '16oWWdfgsoFXKfWo27vDHDVEaTUshqFr1h',
  node_env: 'development',
  bsv_per_difficulty: 2
})

nconf.required([
  'onchain_app_id'
])

export default nconf

function transform(obj) {
  return {
    key: obj.key.toLowerCase(),
    value: obj.value
  }
}

