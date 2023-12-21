const express = require('express')
const registerController = require('../controller/register.controller')

const registerRouter = express.Router()

registerRouter.get('/', registerController.registerUser)
registerRouter.post('/', registerController.postRegisterUser)
registerRouter.get('/verify', registerController.registerVerify)

module.exports = {
  registerRouter
}