const express = require('express')
const orderController = require('../controller/order.controller')
const authMiddleware = require('../middleware/authMiddleware')

const orderRouter = express.Router()

orderRouter.use(authMiddleware)

orderRouter.get('/buyProduct/:id', orderController.buyProduct)
orderRouter.post('/buyProduct/:id', orderController.checkout)

module.exports = {
  orderRouter
}