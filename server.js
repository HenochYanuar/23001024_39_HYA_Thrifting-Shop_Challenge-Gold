const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
const bodyParser = require('body-parser')
const { registerRouter } = require('./routes/register.route')
const { loginRouter } = require('./routes/login.route')
const { productRouter } = require('./routes/product.route')
const { profileRouter } = require('./routes/userProfile.route')
const { addressRouter } = require('./routes/userAddress.route')
const { userProductsRouter } = require('./routes/userProducts.route')
const { orderRouter } = require('./routes/order.route')
const port = 3000

const server = express()
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

server.use(methodOverride('_method'))

// middleware untuk memparsing payload json
server.use(express.json())

server.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7200000,
  },
}))

server.use('/user/register', registerRouter)
server.use('/user/login', loginRouter)

server.use(expressLayouts)

server.use('/', productRouter)
server.use('/user/account', profileRouter)
server.use('/user/account', addressRouter)
server.use('/user/account', userProductsRouter)
server.use('/checkout', orderRouter)

server.use((req, res, next) => {
  res.status(404).render('error/error', { message: '404 | Page Not Found', title: 'error', layout: 'error/error' })
})

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))