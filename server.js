const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { registerRouter } = require('./routes/register.route')
const { loginRouter } = require('./routes/login.route')
const port = 3000

const server = express()
server.set('view engine', 'ejs')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))


// middleware untuk memparsing payload json
server.use(express.json())

server.use('/user/register', registerRouter)
server.use('/user/login', loginRouter)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))