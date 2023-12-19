const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const findByEmail = async (email) => {
  try {
      return await db('users').where({ email }).first();
  } catch (error) {
      console.error(error);
      throw new Error('Error finding user by email');
  }
}

const userRegister = user => {
  return db('users').insert(user)
}

module.exports = { 
    userRegister, findByEmail
}