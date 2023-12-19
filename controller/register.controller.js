const userModel = require('../models/user.model');

const registerUser = (req, res) => {
  res.json({
    message: 'Register Page'
  })
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

    const isRegistered = await await userModel.findByEmail(email)

    const isActivation = false

    if (!isRegistered) {
      await userModel.userRegister({
        id, username, email, mobile_phone, password, 
        isRegister : isActivation
      })
      res.status(201).json({ message: 'User registered successfully' })
    } else {
      await res.status(400).json({message: 'User registration failed, Email already exists'})
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  registerUser, postRegisterUser
}