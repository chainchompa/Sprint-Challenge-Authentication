const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');


const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db('users')
    .insert(user)
    .then(user => {
      const token = generateToken(user);
      res.status(201).json(token);
    })
    .catch(error => {
      res.status(500).json({ error: 'Could not register user' });
    });
}

function login(req, res) {
  const credentials = req.body;

  db('users')
  .where({ username: credentials.username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = generateToken(user);
      res.send(token);
    }
    return res.status(401).json({'errorMessage': 'The username and password you entered did not match our records. You shall not pass!'})
  })
  .catch(err => {
    res.status(500).json({'error': 'Could not login user'})
  })}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
