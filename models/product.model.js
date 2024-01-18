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

const getAllByQuery = async (searchQuery) => {
  try {
    return await db('goods')
      .where((builder) => {
        builder.where('itemCategory', 'ILIKE', `%${searchQuery}%`)
          .orWhere('brand', 'ILIKE', `%${searchQuery}%`)
          .orWhere('item_name', 'ILIKE', `%${searchQuery}%`);
      })
      .andWhere((builder) => {
        builder.where('isSold', '=', false);
      })
      .select()

  } catch (error) {
    console.error('Error getting all by query item products:', error)
    throw new Error('Error geting all by query item products')
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
  return await db('goods').insert(item)
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

const getProductObject = (product) => {
  return {
    id: product.id,
    itemCategory: product.itemCategory,
    item_name: product.item_name,
    brand: product.brand,
    price: product.price,
    description: product.description,
    foto: product.foto,
    isSold: product.isSold,
    userID: product.userID
  }
}

const getForSaleProducts = async (userID) => {
  try {
    return await db('goods').where({ userID, isSold: false }).select()
  } catch (error) {
    throw new Error('Error geting for sale products ')
  }
}

const getSoldProducts = async (userID) => {
  try {
    return await db('goods').where({ userID, isSold: true }).select()
  } catch (error) {
    throw new Error('Error geting for sale products ')
  }
}

const getPurchasedProducts = async (userID) => {
  try {
    return await db('orders')
      .join('goods', 'orders.goodsID', '=', 'goods.id')
      .select('goods.*')
      .where('orders.userID', userID)
  } catch (error) {
    throw new Error('Error geting purchased products ')
  }
}

const getProductByGoodsId = async (id) => {
  try {
    return await db('goods').where({ id }).first()
  } catch (error) {
    throw new Error('Error geting products by id ')
  }
}

module.exports = {
  getAll, getUserProducts, create, getOne, update, deleteUserProduct, isSoldUpdate, getAllByQuery,
  getForSaleProducts, getProductObject, getSoldProducts, getPurchasedProducts, getProductByGoodsId
}