const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const bcrypt = require('bcrypt')
const validateUser = require('../utils/validator').validateUser

const registerUser = function (req, res) {
  const success = (msg) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
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
          res.json({
            success: true,
            message: 'You are now registered',
            token: user.token
          })
        })
    })
  }

  const fail = (message) => {
    res.status(400).json({
      success: false,
      message
    })
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  validateUser(user, success, fail)
}

module.exports = {
  registerUser
}
