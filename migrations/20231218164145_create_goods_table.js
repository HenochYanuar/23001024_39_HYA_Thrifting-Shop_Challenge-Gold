/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('goods', (table) => {
    table.bigInteger('id').primary()
    table.string('itemCategory', 100).notNullable()
    table.string('brand', 100).notNullable()
    table.integer('price', 15).notNullable()
    table.text('description')
    table.specificType('foto', 'bytea').notNullable()
    table.bigInteger('userID').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('goods')
};
