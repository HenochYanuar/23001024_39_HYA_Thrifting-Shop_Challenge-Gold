const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')

const getUserProfile = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  const { id, username, mobile_phone, email } = user

  const userBio = await userBioModel.findByUserId(id)

  let context = {
    username, mobile_phone, email,
    name: '', gendre: '', birthday: '', foto: ''
  }

  if (!userBio) {
    res.status(200).render('user/userProfile', { context })
    return
  }

  const { name, gender, birthday, foto } = userBio

    context = {
      username, mobile_phone, email, name, gender, birthday, foto
    }

  res.status(200).render('user/userProfile', { context })
}

const postUserProfile = async (req, res) => {

  try {
    const { username, name, email, mobile_phone, gender, birthday } = req.body

    let user = await userModel.findByEmail(email)

    if (!user) {
      res.status(400).render('user/userProfile', { message: `Failed to save user with email ${email}` })
    }

    await userModel.update(email, username, mobile_phone)

    let userBio = await userBioModel.findByUserId(user.id)

    const id = await idCreator.createID()

    if (!userBio) {
      await userBioModel.create({
        id, name, gender, birthday,
        userID: user.id
      })
    } else {
      await userBioModel.update(user.id, name, gender, birthday)
    }

    res.status(201).redirect('/user/account/profile')

  } catch (error) {
    console.error('Error in postRegisterUser:', error)
    res.status(500).redirect('/user/account/profile')
  }

}

const postFotoProfile = async (req, res) => {
  try {
    const foto = req.file.filename

    const user = await userModel.findByEmail(req.session.email)

    if (!user) {
      res.status(400).render('user/userProfile', { message: `Failed to save user with email ${email}` })
      return
    }

    const userBio = await userBioModel.findByUserId(user.id)

    const id = await idCreator.createID()

    if (!userBio) {
      await userBioModel.createFotoProfile({
        id, foto,
        userID : user.id,
      })
    }

    await userBioModel.updateFotoProfile(user.id, foto)
    

    res.status(201).redirect('/user/account/profile')

  } catch (error) {
    console.error('Error in postFotoProfile:', error)
    res.status(500).redirect('/user/account/profile')
  }
}

const uploadMiddleware = saveImgMiddleware.uploadUserMiddleware

module.exports = {
  getUserProfile, postUserProfile, postFotoProfile, uploadMiddleware
}