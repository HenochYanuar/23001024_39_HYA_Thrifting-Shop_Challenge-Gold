const express = require('express')
const userAddressController = require('../controller/userAddress.controller')
const authMiddleware = require('../middleware/authMiddleware')

const addressRouter = express.Router()

addressRouter.use(authMiddleware)

addressRouter.get('/addresses', userAddressController.getUserAddress)
addressRouter.get('/addresses/add', userAddressController.addUserAddress)
addressRouter.post('/addresses', userAddressController.postAddUserAddress)
addressRouter.get('/addresses/:id', userAddressController.updateUserAddres)
addressRouter.put('/addresses', userAddressController.postUpdateUserAddress)
addressRouter.delete('/addresses/:id', userAddressController.deleteUserAddress)


module.exports = { 
  addressRouter
}