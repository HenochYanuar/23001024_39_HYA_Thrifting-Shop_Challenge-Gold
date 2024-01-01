const express = require('express')
const productController = require('../controller/product.controller')
const authMiddleware = require('../middleware/authMiddleware')

const userProductsRouter = express.Router()

userProductsRouter.use(authMiddleware)

userProductsRouter.get('/userProducts', productController.getUserProducts)
userProductsRouter.get('/userProducts/add', productController.addUserProduct)
userProductsRouter.post('/userProducts', productController.uploadMiddleware, productController.postAddUserProduct)
userProductsRouter.get('/userProducts/update/:id', productController.updateUserProduct)
userProductsRouter.post('/userProducts/update', productController.uploadMiddleware, productController.postUpdateUserProduct)
userProductsRouter.get('/userProducts/delete/:id', productController.deleteUserProduct)

module.exports = {
  userProductsRouter
}