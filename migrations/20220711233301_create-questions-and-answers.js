/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {

  await knex.schema.createTable('questions', table => {

    table.increments('id');

    table.string('tx_id', 255).notNullable();

    table.integer('tx_index').notNullable();

    table.string('content', 255).notNullable();

    table.string('author', 255).nullable();

    table.unique(['tx_id', 'tx_index'])

  })

  await knex.schema.createTable('answers', table => {

    table.increments('id');

    table.string('question_tx_id', 255).notNullable();

    table.string('tx_id', 255).notNullable();

    table.integer('tx_index').notNullable();

    table.integer('content').notNullable();

    table.integer('author').nullable();

    table.unique(['tx_id', 'tx_index'])

  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {

  await knex.schema.dropTable('questions')

  await knex.schema.dropTable('answers')
  
};
