require('dotenv').config()

const { Client } = require('@elastic/elasticsearch');

import { models } from './models'

export async function importAll() {

    const client = new Client({
      cloud: { id: process.env.elastic_cloud_id },
      auth: { apiKey: process.env.elastic_api_key }
    })

    const questions = await models.Question.findAll()

    const answers = await models.Question.findAll()

    for (let question of questions) {

        const result = await client.index({
            index: 'askbitcoin',
            id: `question-${question.id}`,
            document: {               
                ...question.toJSON()
            }
        })

        console.log({ result })
    }

    for (let answer of answers) {

        const result = await client.index({
            index: 'askbitcoin',
            id: `question-${answer.id}`,
            document: {
                type: 'answer',
                ...answer.toJSON()
            }
        })

        console.log({ result })
    }

    await client.indices.refresh({ index: 'askbitcoin' })

    // Let's search!
    const result= await client.search({
      index: 'askbitcoin',
      query: {
        match: { content: 'profit seeking' }
      }
    })

    console.log({ result })

    for (let hit of result.hits.hits) {
        console.log(hit)
    }

}

importAll()
