/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.bigInteger('id').primary()
    table.bigInteger('userID').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    table.bigInteger('goodsID').unsigned().references('id').inTable('goods').onDelete('CASCADE').onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders')
};
