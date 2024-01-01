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

const getOne = async (id) => {
  try {
    return await db('goods').where({ id }).first()
  } catch (error) {
    throw new Error('Error geting one user product ')
  }
}

const update = async (id, itemCategory, brand, price, description, foto) => {
  try {
    return await db('goods').where({ id }).update({ itemCategory, brand, price, description, foto })
  } catch (error) {
    throw new Error('Error updateing user product by id')
  }
}

module.exports  = {
  getAll, getUserProducts, create, getOne, update
}