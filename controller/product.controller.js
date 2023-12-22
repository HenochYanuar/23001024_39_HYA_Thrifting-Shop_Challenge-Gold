const productModel = require('../models/product.model')

const getAllProducts = (req, res) => {
  res.status(200).render('product/dashboardProduct')
}

module.exports = {
  getAllProducts
}