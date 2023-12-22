const express = require('express')
const productController = require('../controller/product.controller')

const productRouter = express.Router()

productRouter.get('/', productController.getAllProducts)

module.exports = {
  productRouter
}