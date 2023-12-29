// Update with your config settings.

const connection = {
  client: 'pg',
  connection: {
      host: 'localhost', // your host
      port: '5432', // your port
      database: 'your_database_name', // Please write your database name here
      user: 'postgres', // your user
      password: 'your_password', // Please write your postgreSQL password here
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