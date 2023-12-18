/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usersAddress', (table) => {
    table.bigInteger('id').primary()
    table.string('province', 55).notNullable()
    table.string('regency', 55).notNullable()
    table.string('subdistrict', 55).notNullable()
    table.specificType('postalCode', 'varchar(10)')
    table.text('addressDetail')
    table.bigInteger('userID').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usersAddress')
};
