// Update with your config settings.

const connection = {
  client: 'pg',
  connection: {
      host: 'localhost',
      port: '5432',
      database: 'Thrifting-Shop_Challenge-Gold',
      user: 'postgres',
      password: 'telo_godok',
  }
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: connection,
  staging: connection,
  production: connection,
}