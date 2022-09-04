
import { EventEmitter } from 'events'

const stream = new EventEmitter()

export { stream }

import axios from 'axios'

export async function listBoostpowJobs() {

  //const { data } = await axios.get('https://askbitcoin.ai/api/v1/boostpow/jobs')
  const { data } = await axios.get('http://localhost:5200/api/v1/boostpow/jobs')

  return data

}

export async function getNextJob(): Promise<any | null> {

  try {

    const { jobs } = await listBoostpowJobs()

    const mostProfitable = jobs.slice(0, 10)

    const job = mostProfitable[Math.floor(Math.random() * mostProfitable.length)];

    return job

  } catch(error) {

    return null

  }

}

