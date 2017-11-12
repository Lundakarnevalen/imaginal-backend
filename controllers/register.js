const sequelize = require('../config/database.js').dbc
const User = require('../models').User;
const Role = require('../models').Role;
const bcrypt = require('bcrypt')

let registerUser = function (req, res) {
  // 10 rounds used for salt, needs to be tested and optimized
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    sequelize.sync()
    .then(() => User.create({
      email: req.body.email,
      password: hash,
      token: 'temporary token'
    }))
    .then(() => Role.create({
      description: 'karnevalist1337'
    }))
    .then(() => User.hasMany(Role, {
      through: 'user_articles' //funkar ej
    }))
    .then(user => {
      let resp = {}
      resp.success = true
      resp.message = 'You are now registered'
      resp.accessToken = user.accessToken
      res.send(resp)
    })
  })
}

module.exports = {
  registerUser
}
