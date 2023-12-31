const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

const getUserAddres = async (userID) => {
  try {
    return await db('usersAddress').where({ userID })
  } catch (error) {
    throw new Error('Error geting user Address ')
  }
}

const create = async (address) => {
  return await db('usersAddress').insert( address )
}

const getOne = async (id) => {
  try {
    return await db('usersAddress').where({ id }).first()
  } catch (error) {
    throw new Error('Error geting one user Address ')
  }
}

const update = async (id, province, regency, subdistrict, postalCode, addressDetail) => {
  try {
    return await db('usersAddress').where({ id }).update({ province, regency, subdistrict, postalCode, addressDetail })
  } catch (error) {
    throw new Error('Error updateing user address by address ID')
  }
}

const deleteUserAddress = async (id) => {
  try {
    return await db('usersAddress').where({ id }).del()
  } catch (error) {
    throw new Error('Error deleting user address by address ID')
  }
}

module.exports = {
  getUserAddres, create, getOne, update, deleteUserAddress
}