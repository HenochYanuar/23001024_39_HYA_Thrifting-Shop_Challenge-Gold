/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('usersBio', (table) => {
    table.string('name', 255).nullable().alter()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('usersBio', (table) => {
    table.string('name', 255).notNullable().alter()
  })
};
