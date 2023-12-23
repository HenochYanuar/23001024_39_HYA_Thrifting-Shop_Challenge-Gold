const express = require('express')
const productController = require('../controller/product.controller')
const authMiddleware = require('../middleware/authMiddleware')

const productRouter = express.Router()

productRouter.get('/', productController.getAllProducts)

productRouter.use(authMiddleware)

module.exports = {
  productRouter
}