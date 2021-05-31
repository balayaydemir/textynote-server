require('dotenv').config();
const express = require('express')
const { Magic } = require('@magic-sdk/admin')
const app = express()
const path = require('path');
const cors = require('cors');
const db = require('./queries')
const port = 8080

app.use(express.json())
app.use(express.urlencoded())

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

// Allow requests from client-side
app.use(cors({ origin: process.env.CLIENT_URL }));

app.post('/api/login', async (req, res) => {
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/api/user', db.createUser)
app.post('/api/note', db.createUserNote)
app.delete('/api/note/:id', db.deleteUserNote)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})