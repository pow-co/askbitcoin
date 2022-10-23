
import { Job, BoostPowJobProof as Proof } from 'boostpow'

import { stream } from 'powco'

import { importJobsFromTxId, importProofsFromTxId } from '../boostpow'

export default async function start() {

  stream.on('boostpow.job', (job: Job) => {

    console.log('boostpow.job', job)

    importJobsFromTxId({ tx_id: job.txid })

  })

  stream.on('boostpow.proof', (proof: Proof) => {

    console.log('boostpow.proof', proof)

    importProofsFromTxId({ tx_id: proof.txid });

  })

}

