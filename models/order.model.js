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

const getProductByGoodsId = async (goodsID) => {
  try {
    return await db('orders').where({ goodsID }).first()
  } catch (error) {
    throw new Error('Error geting product by item id ')
  }
}

module.exports = {
  buyProduct, getProductByGoodsId
}