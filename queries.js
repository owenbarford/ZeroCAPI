const Pool = require('pg').Pool
const DbConfig = require('./dbconfig')
const pool = new Pool({
  user: DbConfig.user,
  host: DbConfig.host,
  database: DbConfig.database,
  password: DbConfig.password,
  port: DbConfig.port,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const createUser = (request, response) => {
    const { name } = request.body
  
    pool.query('INSERT INTO users (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }
  
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE users SET name = $1 WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}