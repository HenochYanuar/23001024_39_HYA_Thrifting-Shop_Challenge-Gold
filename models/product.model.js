const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const getAll = async () => {
  try {
    return await db('goods').select()
  } catch (error) {
    throw new Error('Error geting all item products')
  }
}

const getUserProducts = async (userID) => {
  try {
    return await db('goods').where({ userID })
  } catch (error) {
    throw new Error('Error geting user products ')
  }
}

const create = async (item) => {
  return await db('goods').insert( item )
}

module.exports  = {
  getAll, getUserProducts, create
}