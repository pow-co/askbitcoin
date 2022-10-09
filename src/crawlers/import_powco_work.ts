
import axios from 'axios'
import { importProofsFromTxHex, importProofsFromTxId } from '../boostpow'
import { models } from '../models'

import * as moment from 'moment'

import delay from 'delay'

export default async function start() {

  const [storage] = await models.KeyValue.findOrCreate({
    where: {
      key: 'powco_work_importer'
    },
    defaults: {
      key: 'powco_work_importer',
      value: {
        start_timestamp: 0
      }
    }
  })

  console.log('STORAGE', storage.toJSON())

  const { start_timestamp } = storage.value

  const limit = 25

  let offset = 0

  while (true) {

    const { data } = await axios.get(`https://pow.co/api/v1/boost/work?start=${start_timestamp}&offset=${offset}&limit=${limit}`)

    if (data.work.length === 0) {

      await delay(5000)

      continue;

    }

    for (let { tx_hex, content, timestamp, spend_tx_id: tx_id } of data.work) {

      console.log({tx_hex, content, timestamp})

      const question = await models.Question.findOne({
        where: {
          tx_id: content
        }
      })

      const answer = await models.Answer.findOne({
        where: {
          tx_id: content
        }
      })

      if (question  || answer) {

        if (tx_hex) {

          await importProofsFromTxHex({ tx_hex })

        } else if (tx_id) {

          await importProofsFromTxId({ tx_id })

        }

      }

      storage.value = {
        start_timestamp: moment(timestamp).unix()
      }

      await storage.save()

    }

    offset += limit

  }

}

if (require.main === module) {

  start()

}
