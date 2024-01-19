const express = require('express')
const orderController = require('../controller/order.controller')
const authMiddleware = require('../middleware/authMiddleware')

const orderRouter = express.Router()

orderRouter.use(authMiddleware)

orderRouter.get('/:id', orderController.checkout)
orderRouter.post('/:id', orderController.buyProduct)

module.exports = {
  orderRouter
}