/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usersBio', (table) => {
    table.bigInteger('id').primary()
    table.string('name', 255).notNullable()
    table.enum('gender', ['Laki-laki', 'Wanita']).defaultTo('Laki-laki')
    table.date('birthday')
    table.specificType('foto', 'bytea')
    table.bigInteger('userID').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usersBio')
};
