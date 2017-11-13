const sequelize = require('../config/database.js').dbc
const users = require('../models/users')

let registerUser = function (req, res) {
  // 10 rounds used for salt, needs to be tested and optimized
  sequelize.sync()
    .then(() => users.User.create({
      email: req.body.email,
      token: 'temporary token'
    }))
    .then(user => {
      let resp = {}
      users.setNewPassword(user, req.body.password)
      resp.success = true
      resp.message = 'You are now registered'
      resp.token = user.token
      res.send(resp)
    })
}

module.exports = {
  registerUser
}
