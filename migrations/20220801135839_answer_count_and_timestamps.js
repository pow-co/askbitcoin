/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table("questions", (table) => {
    table.time("timestamp");

    table.integer("answer_count");
  });

  await knex.schema.table("answers", (table) => {
    table.time("timestamp");

    //table.integer('answer_count')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table("questions", (table) => {
    table.dropColumn("created_ad");

    table.dropColumn("answer_count");
  });

  await knex.schema.table("answers", (table) => {
    table.dropColumn("timestamp");

    //table.integer('answer_count')
  });
};
