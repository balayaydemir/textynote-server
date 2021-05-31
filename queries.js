const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'textynote',
  password: 'password',
  port: 5432,
})

const createUser = (request, response) => {
  const { email, phone } = request.body

  pool.query('INSERT INTO users (email, phone) VALUES ($1, $2)', [email, phone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const createUserNote = (request, response) => {
  const { content, userId } = request.body

  pool.query('INSERT INTO notes (content, userId) VALUES ($1, $2)', [content, userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Note added with ID: ${result.insertId}`)
  })
}

const deleteUserNote = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM notes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Note deleted with ID: ${id}`)
  })
}

module.exports = {
  createUser,
  createUserNote,
  deleteUserNote
}