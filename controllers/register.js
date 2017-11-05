const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const bcrypt = require('bcrypt')

let registerUser = function (req, res) {
  // 10 rounds used for salt, needs to be tested and optimized
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    sequelize.sync()
    .then(() => users.User.create({
      email: req.body.email,
      password: hash,
      token: 'temporary token'
    }))
    .then(user => {
      let resp = {}
      resp.success = true
      resp.message = 'You are now registered'
      resp.token = user.token
      res.send(resp)
    })
  })
}

module.exports = {
  registerUser
}
