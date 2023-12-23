const userModel = require('../models/user.model')

const getUserProfile = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  const { username, mobile_phone, email } = user
  const context = {
    username, mobile_phone, email
  }
  res.status(200).render('user/userProfile', { context })
}

module.exports = {
  getUserProfile
}