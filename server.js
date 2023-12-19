const express = require('express')
const { registerRouter } = require('./routes/register.route')
const port = 3000

const server = express()

// middleware untuk memparsing payload json
server.use(express.json())

server.use('/user/register', registerRouter)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))