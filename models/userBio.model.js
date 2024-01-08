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

const createFotoProfile = (data) => {
  return db('usersBio').insert(data)
}

const update = async (userID, name, gender, birthday) => {
  try {
    return await db('usersBio').where({ userID }).update({ name, gender, birthday })
  } catch (error) {
    throw new Error('Error updateing biografi user by user ID')
  }
}

const updateFotoProfile = async (userID, foto) => {
  try {
    return await db('usersBio').where({ userID }).update({ foto })
  } catch (error) {
    throw new Error('Error updateing foto user by user ID')
  }
}

module.exports = {
  findByUserId, create, update, createFotoProfile, updateFotoProfile
}