const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const MailRegister = require('../middleware/mailRegister')

const registerUser = (req, res) => {
  res.status(200).render('login&Register/register')
  
}

const postRegisterUser = async (req, res) => {

  try {
    const { username, email, mobile_phone, password } = req.body

    const userId = new Date()

    const year = userId.getFullYear();
    const month = userId.getMonth() + 1;
    const date = userId.getDate();
    const hours = userId.getHours();
    const minutes = userId.getMinutes();
    const seconds = userId.getSeconds();
    const milliseconds = userId.getMilliseconds();

    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`

    let user = await userModel.findByEmail(email)
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

      res.status(201).render('login&Register/login', { message: 'User registered successfully' })

    } else {
      res.status(400).render('login&Register/register', { message: 'User registration failed, Email already exists' })
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
      res.status(400).json({ message: `Users with email ${email} are not registered` })

    } else {
      await userModel.verify(email, user.isRegistered = true)

      res.status(200).json({ message: 'Your email has been successfully verified'})

    }
  } catch (error) {
    console.error('Error in postRegisterUser:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }

}

module.exports = {
  registerUser, postRegisterUser, registerVerify
}