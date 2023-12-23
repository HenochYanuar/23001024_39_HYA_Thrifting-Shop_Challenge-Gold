const express = require('express')
const productController = require('../controller/product.controller')
const authMiddleware = require('../middleware/authMiddleware')

const productRouter = express.Router()

productRouter.use(authMiddleware)

productRouter.get('/', productController.getAllProducts)

module.exports = {
  productRouter
}