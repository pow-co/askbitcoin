/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('boostpow_proofs', table => {

    table.increments('id');

    table.string('tx_id', 255).notNullable();

    table.string('tx_index', 255).notNullable();

    table.string('signature', 255).notNullable();

    table.string('minerPubKey', 255).notNullable();

    table.string('time', 255).notNullable();

    table.string('nonce', 255).notNullable();

    table.string('extraNonce1', 255).notNullable();

    table.string('extraNonce2', 255).notNullable();

    table.string('minerPubKeyHash', 255).notNullable();

    table.string('job_tx_id', 255).notNullable();

    table.string('job_tx_index', 255).notNullable();

    table.string('content', 255).notNullable();

    table.string('tag', 255).nullable();

    table.decimal('difficulty').notNullable();

    table.integer('value').notNullable();

    table.date('timestamp').notNullable();

    table.unique(['tx_id', 'tx_index'])

  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  return knex.schema.dropTable('boostpow_proofs')
  
};

