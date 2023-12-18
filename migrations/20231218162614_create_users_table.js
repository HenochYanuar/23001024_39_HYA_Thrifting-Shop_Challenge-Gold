/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigInteger('id').primary()
    table.string('username', 255).notNullable()
    table.string('email').notNullable()
    table.specificType('mobile_phone', 'varchar(15)')
    table.specificType('password', 'char(60)').notNullable()
    table.boolean('isRegister').notNullable().defaultTo(false)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
