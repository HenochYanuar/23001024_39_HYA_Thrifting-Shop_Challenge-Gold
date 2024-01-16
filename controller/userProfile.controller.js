const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')


const layout = 'layouts/baseLayout'
const err404 = {
  message : '404 | User Not Found',
  layout : 'error/error'
}

const err500 = {
  message : '500 | Internal Server Error',
  layout : 'error/error'
}

const getUserProfile = async (req, res) => {
  const session = await userModel.findByEmail(req.session.email)
  const userBio = await userBioModel.findByUserId(session.id)

  let context = {
    session, userBio
  }

  const title = 'Thrifting Shop | Update Profile Anda dan Pastikan Data Anda Benar' 

  res.status(200).render('user/userProfile', { context, title, layout })
}

const postUserProfile = async (req, res) => {
  try {
    const { username, name, email, mobile_phone, gender, birthday } = req.body

    let user = await userModel.findByEmail(email)

    if (!user) {
      res.status(400).render('error/error', err404)
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
    res.status(500).render('error/error', err500)
  }

}

const postFotoProfile = async (req, res) => {
  try {
    const foto = req.file.filename
    
    const user = await userModel.findByEmail(req.session.email)

    if (!user) {
      res.status(400).render('error/error', err404)
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
    res.status(500).render('error/error', err500)
  }
}

const uploadMiddleware = saveImgMiddleware.uploadUserMiddleware

module.exports = {
  getUserProfile, postUserProfile, postFotoProfile, uploadMiddleware
}