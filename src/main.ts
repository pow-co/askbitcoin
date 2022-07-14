
import config from './config'

import { start as server } from './server'

import { knex } from './knex'

import { BoostPowJob, BoostPowJobProof } from 'boostpow'

import * as whatsonchain from './whatsonchain'

import { start as actors } from './rabbi/actors'

import { sync_boost_orders, sync_ask_bitcoin } from './planaria'

import { onchain } from './rabbi/onchain/bitsocket'

import { spawn } from 'child_process'

import { log } from './log'

import { getTransaction } from './powco'

export async function start() {

  await knex.migrate.latest();

  if (config.get('webui_enabled')) {

    const nextjs = spawn("npm", ["run", "start"], {

      cwd: `${process.cwd()}/web-ui`

    });

  }

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  if (config.get('sync_boost_orders')) {

    sync_boost_orders();

  }

  if (config.get('sync_ask_bitcoin')) {

    sync_ask_bitcoin();

    const app_id = config.get('askbitcoin_onchain_app_id')

    const boostpow = config.get('boostpow_onchain_app_id')

    onchain(boostpow).on('*', (event) => {
      log.info('onchain.boostpow.event', event)
    })

    onchain(boostpow).on('proof', async ({tx_id}) => {

      log.info(`onchain.${boostpow}.proof`, {tx_id})

      if (tx_id) {

        let tx = await getTransaction(tx_id)

        console.log(tx.toString())

        let proof = BoostPowJobProof.fromTransaction(tx)

        if (proof) {

          console.log(proof)

          let json = Object.assign(proof.toObject(), {
            tx_id: proof.txid,
            tx_index: proof.vin
          })

          const job_tx = await getTransaction(proof.spentTxid)

          const job = BoostPowJob.fromTransaction(job_tx)

          json = Object.assign(json, { 
            job_tx_id: job.txid,
            job_tx_index: job.vout,
            content: job.content.hex,
            tag: job.tag.hex,
            difficulty: job.difficulty,
            value: job.value,
            timestamp: new Date()
          })

          console.log(json)

          const [record] = await knex('boostpow_proofs').where({
            tx_id: json.tx_id,
            tx_index: json.tx_index
          })
          .select('*')

          console.log('record', record)

          if (!record) {

            try {

              let woc_tx = await whatsonchain.getTransaction(json.tx_id)

              console.log({ woc_tx })

              if (woc_tx && woc_tx.time) {

                json['timestamp'] = woc_tx.time

              }

            } catch(error) {

              log.error('whatsonchain.get_transaction', error)

            }

            try {

              const result = await knex('boostpow_proofs').insert(json)

              console.log(result)

            } catch(error) {

              log.debug('knex.boostpow_proofs.insert.error', { error, json })

              log.error('knex.boostpow_proofs.insert', error)

            }
          }

        }

      }

      // if no txid then txid is this transaction
      // download the raw transaction
      // check to see if transaction in fact contains boost proofs

    })

    onchain(boostpow).on('job', (job) => {

      log.info(`onchain.${boostpow}.job`, job)

    })

    const askbitcoin = onchain(app_id)

    askbitcoin.on('*', (event) => {

      log.info(`onchain.${app_id}.event`, event)

    })

    askbitcoin.on('question', (value) => {

      log.info(`onchain.${app_id}.question`, value)

    })

    askbitcoin.on('answer', (value) => {

      log.info(`onchain.${app_id}.answer`, value)

    })

    askbitcoin.on('error', (error) => {

      log.error(`onchain.${app_id}.error`, error)

    })

  }

}

if (require.main === module) {

  start()

}
