const express = require('express')
const registerController = require('../controller/register.controller')

const loginRouter = express.Router()

loginRouter.get('/', registerController.login)
loginRouter.post('/', registerController.postLogin)
loginRouter.get('/logout', registerController.logout)

module.exports = {
  loginRouter
}