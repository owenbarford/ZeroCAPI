const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const db = require('./queries')
const port = 3000

server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

server.get('/users', db.getUsers)
server.get('/users/:id', db.getUserById)
server.post('/users', db.createUser)
server.put('/users/:id', db.updateUser)
server.delete('/users/:id', db.deleteUser)

server.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})