const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

const findByUserId = async (userID) => {
  try {
    return await db('usersBio').where({ userID }).first()
  } catch (error) {
    throw new Error('Error finding user by userId')
  }
}

const create = userBio => {
  return db('usersBio').insert(userBio)
} 

const update = async (userID, name, gender, birthday, foto) => {
  try {
    return await db('usersBio').where({ userID }).update({ name, gender, birthday, foto })
  } catch (error) {
    throw new Error('Error updateing biografi user by user ID')
  }
}

module.exports = {
  findByUserId, create, update
}