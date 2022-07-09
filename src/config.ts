
import { log } from './log'

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

const global_file = `/etc/rabbi/config.json`

const user_file = `${os.homedir()}/.rabbi/config.json`

const project_file = `${process.cwd()}/.rabbi/config.json`

nconf.add('project_file', { type: 'file', file: project_file, transform })

nconf.add('user_file', { type: 'file', file: user_file, transform })

nconf.add('global_file', { type: 'file', file: global_file, transform })

export function loadFromFiles() {

  log.info('config.file.project.load', { path: project_file })

  nconf.use('project_file', { type: 'file', file: project_file, transform })

  log.info('config.file.user.load', { path: user_file })

  nconf.use('user_file', { type: 'file', file: user_file, transform })

  log.info('config.file.global.load', { path: global_file })

  nconf.use('global_file', { type: 'file', file: global_file, transform })

}

loadFromFiles()

process.on('SIGHUP', () => {

  loadFromFiles()

})

nconf.defaults({
  config: null,
  host: '0.0.0.0',
  port: '5200',
  prometheus_enabled: true,
  amqp_enabled: true,
  http_api_enabled: true,
  swagger_enabled: true,
  postgres_enabled: false,
  database_url: 'postgres://postgres:password@postgres:5432/rabbi',
  amqp_url: 'amqp://guest:guest@rabbitmq:5672/rabbi',
  amqp_exchange: 'rabbi'
})

export default nconf

function transform(obj) {
  return {
    key: obj.key.toLowerCase(),
    value: obj.value
  }
}

