const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const getAll = async () => {
  try {
    return await db('goods').where('isSold', false).select()
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

const update = async (id, item_name, itemCategory, brand, price, description, foto) => {
  try {
    return await db('goods').where({ id }).update({ item_name, itemCategory, brand, price, description, foto })
  } catch (error) {
    throw new Error('Error updateing user product by id')
  }
}

const deleteUserProduct = async (id) => {
  try {
    return await db('goods').where({ id }).del()
  } catch (error) {
    throw new Error('Error deleting user product by id')
  }
}

const isSoldUpdate = async (id) => {
  try {
    return await db('goods').where({ id }).update('isSold', true)
  } catch (error) {
    throw new Error('Error updateing isSold field')   
  }
}

module.exports  = {
  getAll, getUserProducts, create, getOne, update, deleteUserProduct, isSoldUpdate
}