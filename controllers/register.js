const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const validateUser = require('../utils/validator').validateUser

const registerUser = function (req, res) {
  const success = (msg) => {
    users.User.findOne({
      where: {email: req.body.email}
    }).then((user) => {
      if (user !== null) {
        res.json({
          success: false,
          message: 'User already registered'
        })
      } else {
        createUser(req.body.email, req.body.password, res)
      }
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

const createUser = function (email, password, res) {
  sequelize.sync()
    .then(() => users.User.create({
      email: email
    }))
    .then(user => {
      users.setNewPassword(user, password)
      res.json({
        success: true,
        message: 'You are now registered'
      })
    })
}

module.exports = {
  registerUser
}
