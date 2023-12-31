const express = require('express')
const userAddressController = require('../controller/userAddress.controller')
const authMiddleware = require('../middleware/authMiddleware')

const addressRouter = express.Router()

addressRouter.use(authMiddleware)

addressRouter.get('/address', userAddressController.getUserAddress)
addressRouter.get('/address/add', userAddressController.addUserAddress)
addressRouter.post('/address', userAddressController.postAddUserAddress)
addressRouter.get('/address/update/:id', userAddressController.updateUserAddres)
addressRouter.post('/address/update', userAddressController.postUpdateUserAddress)


module.exports = { 
  addressRouter
}