const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const getAll = async () => {
  try {
    return await db('goods').select();
  } catch (error) {
    throw new Error('Error geting all item products');
  }
}

module.exports  = {
  getAll
}