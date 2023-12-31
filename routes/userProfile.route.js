const express = require('express')
const userProfileController = require('../controller/userProfile.controller')
const authMiddleware = require('../middleware/authMiddleware')

const profileRouter = express.Router()

profileRouter.use(authMiddleware)

profileRouter.get('/', (req, res) => {
  res.redirect('/user/account/profile')
})
profileRouter.get('/profile', userProfileController.getUserProfile)
profileRouter.post('/profile',  userProfileController.postUserProfile)
profileRouter.post('/profile/foto', userProfileController.uploadMiddleware, userProfileController.postFotoProfile)

module.exports = {
  profileRouter
}