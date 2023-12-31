const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 


const buyProduct = async (data) => {
  try {
    return await db('orders').insert( data )
  } catch (error) {
    throw new Error('Error checkout product ')
  }
}

module.exports = {
  buyProduct,
}