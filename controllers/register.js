const sequelize = require('../config/database.js').dbc
const users = require('../models/users')

let registerUser = function (req, res) {
  users.User.findOne({
    where: {email: req.body.email}
  }).then((user) => {
    if (user !== null) {
      let resp = {}
      resp.success = false
      resp.message = 'User already registered'
      res.send(resp)
    } else {
      createUser(req.body.email, req.body.password, res)
    }
  })
  // 10 rounds used for salt, needs to be tested and optimized
}

let createUser = function(email, password, res) {
  sequelize.sync()
    .then(() => users.User.create({
      email: email,
      token: 'temporary token'
    }))
    .then(user => {
      let resp = {}
      users.setNewPassword(user, password)
      resp.success = true
      resp.message = 'You are now registered'
      resp.token = user.token
      res.send(resp)
    })
}

module.exports = {
  registerUser
}
