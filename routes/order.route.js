const express = require('express')
const orderController = require('../controller/order.controller')
const authMiddleware = require('../middleware/authMiddleware')

const orderRouter = express.Router()

orderRouter.use(authMiddleware)

orderRouter.get('/buyProduct/:id', orderController.checkout)
orderRouter.post('/buyProduct/:id', orderController.buyProduct)

module.exports = {
  orderRouter
}