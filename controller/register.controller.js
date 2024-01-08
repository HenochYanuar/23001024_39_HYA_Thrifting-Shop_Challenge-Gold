const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const idCreator = require('../utils/idCreator')
const MailRegister = require('../middleware/mailRegister')

const registerUser = (req, res) => {
  res.status(200).render('login&Register/register', { message: '' })

}

const postRegisterUser = async (req, res) => {

  try {
    const { username, email, mobile_phone, password } = req.body

    if (!username) {
      res.render('login&Register/register', { message: 'Username is required' })

    } else if (!email) {
      res.render('login&Register/register', { message: 'Email is required' })

    } else if (!email) {
      res.render('login&Register/register', { message: 'Password is required' })

    } else {

      let user = await userModel.findByEmail(email)

      const id = await idCreator.createID()

      const isActive = false
      const hashPassword = await bcrypt.hash(password, 10)

      if (!user) {

        user = await userModel.create({
          id, username, email, mobile_phone,
          password: hashPassword,
          isRegister: isActive
        })

        user = req.body

        const mailRegisterInstance = new MailRegister(user)
        await mailRegisterInstance.sendMail()

        res.status(201).render('login&Register/login', { message: 'User registered successfully, check your email for activation !' })

      } else {
        res.status(400).render('login&Register/register', { message: 'User registration failed, Email already exists' })
      }
    }
  } catch (error) {
    console.error('Error in postRegisterUser:', error);
    res.status(500).render('login&Register/register', { error: 'Internal Server Error' })
  }
}

const registerVerify = async (req, res) => {
  try {
    const email = req.query.email

    let user = await userModel.findByEmail(email)

    if (!user) {
      res.status(400).render('login&Register/register', { message: `Users with email ${email} are not registered` })

    } else {

      await userModel.verify(email, user.isRegistered = true)
      res.status(200).render('login&Register/login', { message: 'Your email has been successfully verified' })

    }
  } catch (error) {
    console.error('Error in postRegisterUser:', error)
    res.status(500).render('login&Register/register', { error: 'Internal Server Error' })
  }

}

const login = (req, res) => {
  res.status(200).render('login&Register/login', { message: '' })

}

const postLogin = async (req, res) => {

  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).render('login&Register/login', { message: 'Username and password are required' })
    }

    let user = await userModel.findByEmail(email)

    if (!user) {
      res.status(400).render('login&Register/login', { message: 'Your email is not registered' })

    } else {
      const isValid = await bcrypt.compare(password, user.password)

      if (email === user.email && isValid == true) {
        if (user.isRegister == true) {

          req.session.email = email
          res.status(200).redirect('/')

        } else {
          res.status(400).render('login&Register/login', { message: 'Your email has not been activated, please activate it first' })

        }
      } else {
        res.status(400).render('login&Register/login', { message: 'Your email or password is incorrect' })

      }
    }

  } catch (error) {
    console.error('Error in postRegisterUser:', error)
    res.status(500).render('login&Register/register', { error: 'Internal Server Error' })
  }
}

module.exports = {
  registerUser, postRegisterUser, registerVerify, login, postLogin
}