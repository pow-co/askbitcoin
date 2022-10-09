
import axios from 'axios'
import { importProofsFromTxHex } from '../boostpow'
import { models } from '../models'

export default async function start(start_timestamp: number) {

  const limit = 25

  let offset = 0

  let complete = false

  while (!complete) {

    const { data } = await axios.get(`https://pow.co/api/v1/boost/work?start=${start_timestamp}&offset=${offset}&limit=${limit}`)


    if (data.work.length === 0) {

      complete = true

    }

    for (let { tx_hex, content } of data.work) {

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

        console.log('FOUND', { question, answer })

        let result = await importProofsFromTxHex({ tx_hex })

        console.log(result);

      }

    }

    offset += limit

  }

}

if (require.main === module) {

  start(process.env.start_timestamp ? parseInt(process.env.start_timestamp) : 0)

}
