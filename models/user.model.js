const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const findByEmail = async (email) => {
  try {
      return await db('users').where({ email }).first()
  } catch (error) {
      throw new Error('Error finding user by email')
  }
}

const create = user => {
  return db('users').insert(user)
}

const update = async (email, username, mobile_phone) => {
  try {
    return await db('users').where({ email }).update({ username, email, mobile_phone })
  } catch (error) {
    throw new Error('Error updateing user by email')
  }
}

const verify = async (email, isRegister) => {
  try {
      return await db('users').where({ email }).update({ isRegister })
  } catch (error) {
      throw new Error('Error updateing user by email')
  }
}

module.exports = { 
    create, findByEmail, verify, update
}