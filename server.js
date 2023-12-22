const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/authMiddleware')
const { registerRouter } = require('./routes/register.route')
const { loginRouter } = require('./routes/login.route')
const { productRouter } = require('./routes/product.route')
const port = 3000

const server = express()
server.set('view engine', 'ejs')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

server.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60000,
  },
}));

// middleware untuk memparsing payload json
server.use(express.json())

server.use('/user/register', registerRouter)
server.use('/user/login', loginRouter)

server.use(authMiddleware)

server.get('/', (req, res) => {
  res.render('login&Register/login', { message: 'You must sign in first, to access all features' })
})

server.use('/', productRouter)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))