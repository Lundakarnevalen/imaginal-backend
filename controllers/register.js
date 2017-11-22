const sequelize = require('../config/database.js').dbc
const User = require('../models').User
const Role = require('../models').Role
const UserRole = require('../models').UserRole
const bcrypt = require('bcrypt')

let registerUser = function (req, res) {
  // 10 rounds used for salt, needs to be tested and optimized
  let finalUser
  let finalRole
  const roleDescription = 'Karnevalist'

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
    .then(user => {
      finalUser = user
    })
    .then(() => Role.create({
      description: roleDescription
    }))
    .then(role => {
      finalRole = role
    })
    .then(() => UserRole.create({
      UserId: finalUser.id,
      RoleId: finalRole.id
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
