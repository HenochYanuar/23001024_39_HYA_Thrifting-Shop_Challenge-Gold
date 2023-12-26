const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')

const getUserProfile = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  const { id, username, mobile_phone, email } = user

  const userBio = await userBioModel.findByUserId(id)

  let context = {
    username, mobile_phone, email,
    name: '', gendre: '', birthday: '', foto: ''
  }

  if (userBio != undefined) {
    const { name, gender, birthday, foto } = userBio

    context = {
      username, mobile_phone, email, name, gender, birthday, foto
    }
  }
  res.status(200).render('user/userProfile', { context })
}

const postUserProfile = async (req, res) => {

  try {
    const { username, name, email, mobile_phone, gender, birthday } = req.body
    const foto = req.file.filename

    let user = await userModel.findByEmail(email)

    if (!user) {
      res.status(400).render('user/userProfile', { message: `Failed to save user with email ${email}` })
    }

    await userModel.update(email, username, mobile_phone)

    let userBio = await userBioModel.findByUserId(user.id)

    const userId = new Date()

    const year = userId.getFullYear()
    const month = userId.getMonth() + 1
    const date = userId.getDate()
    const hours = userId.getHours()
    const minutes = userId.getMinutes()
    const seconds = userId.getSeconds()
    const milliseconds = userId.getMilliseconds()

    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`

    if (!userBio) {
      await userBioModel.create({
        id, name, gender, birthday, foto,
        userID: user.id
      })
    } else {
      await userBioModel.update(user.id, name, gender, birthday, foto)
    }

    res.status(201).redirect('/user/account/profile')

  } catch (error) {
    console.error('Error in postRegisterUser:', error)
    res.status(500).render('user/userProfile', { error: 'Internal Server Error' })
  }

}

const uploadMiddleware = saveImgMiddleware.uploadMiddleware

module.exports = {
  getUserProfile, postUserProfile, uploadMiddleware
}