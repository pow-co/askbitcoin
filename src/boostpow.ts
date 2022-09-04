
import { BoostpowJob, BoostpowProof } from './models'

import { Transaction } from 'bsv'

import * as boostpow from 'boostpow'

import { run } from './run'

import { log } from './log'

import { getTimestamp } from './whatsonchain'

export async function importProofsFromTxId({tx_id}: { tx_id: string}): Promise<BoostpowProof[]> {

    const proofs = await BoostpowProof.findAll({
        where: {
            tx_id
        }
    })

    if (proofs.length > 0) {

        return proofs
    }

    const tx_hex = await run.blockchain.fetch(tx_id)

    return importProofsFromTxHex(tx_hex)
    
}

export async function importProofsFromTxHex({tx_hex}: {tx_hex: string}): Promise<BoostpowProof[]> {

    const tx = new Transaction(tx_hex)

    const proofs = await BoostpowProof.findAll({
        where: {
            tx_id: tx.hash || tx.txid
        }
    })

    if (proofs.length > 0) {

        return proofs
    }

    let proof = boostpow.BoostPowJobProof.fromRawTransaction(tx_hex)

    if (!proof) {

        log.info('planaria.importProofFromTxHex', { tx_hex })

        return
    }

    const timestamp = await getTimestamp(proof.txid)

    const jobRecord = await BoostpowJob.findOne({
        where: {
        tx_id: proof.spentTxid,
        tx_index: proof.spentVout
        }
    })

    const job_tx = await run.blockchain.fetch(proof.spentTxid)

    const job: boostpow.Job = boostpow.Job.fromRawTransaction(job_tx)

    const defaults = Object.assign(proof.toObject(), {
        tx_id: proof.txid,
        tx_index: proof.vin,
        timestamp,
        content_tx_id: job.toObject().content,
        difficulty: job.difficulty,
        job_tx_id: job.txid,
        job_tx_index: job.vout,
        value: jobRecord.value,
        price: jobRecord.price
    })

    const [record, isNew] = await BoostpowProof.findOrCreate({
        where: {
        tx_id: proof.txid,
        tx_index: proof.vin
        },
        defaults
    })

    jobRecord.proof_tx_id = proof.txid

    await jobRecord.save()

    return [record]

}

export async function importJobsFromTxId({tx_id}: {tx_id: string}): Promise<BoostpowJob[]> {

    const jobs = await BoostpowJob.findAll({
        where: {
            tx_id: tx_id
        }
    })

    if (jobs.length > 0) {

        return jobs
    }

    const tx_hex = await run.blockchain.fetch(tx_id)

    const tx = new Transaction(tx_hex)
    
}

export async function importJobsFromTxHex({tx_hex}: {tx_hex: string}): Promise<BoostpowJob[]> {

    const tx = new Transaction(tx_hex)

    const jobs = await BoostpowJob.findAll({
        where: {
            tx_id: tx.hash
        }
    })

    if (jobs.length > 0) {

        return jobs
    }

}
