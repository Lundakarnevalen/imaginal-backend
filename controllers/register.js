const sequelize = require('../config/database.js').dbc
const users = require('../models/users')

let registerUser = function(req, res) {
  sequelize.sync()
    .then(() => users.User.create({
      email: req.body.email,
      password: req.body.password,
      token: 'temporary token'
    }))
    .then(user => {
      let resp = {}
      resp.success = true
      resp.message = 'You are now registerd'
      resp.accessToken = user.accessToken
      res.send(resp)
    })
}

module.exports = {
  registerUser
}
