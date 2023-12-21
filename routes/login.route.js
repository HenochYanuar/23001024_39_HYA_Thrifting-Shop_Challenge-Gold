const express = require('express')
const registerController = require('../controller/register.controller')

const loginRouter = express.Router()

loginRouter.get('/', registerController.login)
loginRouter.post('/', registerController.postLogin)

module.exports = {
  loginRouter
}