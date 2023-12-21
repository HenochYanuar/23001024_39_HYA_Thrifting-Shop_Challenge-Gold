const express = require('express')
const bodyParser = require('body-parser')
const { registerRouter } = require('./routes/register.route')
const port = 3000

const server = express()
server.set('view engine', 'ejs')
server.use(bodyParser.urlencoded({ extended: true }))


// middleware untuk memparsing payload json
server.use(express.json())

server.use('/user/register', registerRouter)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))