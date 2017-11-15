'use strict'

const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const forgotpass = require('../models/forgotpassword')
const bcrypt = require('bcrypt')

const generateToken = function (email, callback) {
  bcrypt.hash(email + Math.random(), 10, function (err, hash) {
    if (err) {
      throw err
    }
    forgotpass.ForgotPassword.findOne({ // Checks if we already have a token which is the same as the generated one
      where: {token: hash}
    }).then((token) => {
      if (token !== null) {
        return generateToken(email, callback)
      }
    })
    callback(hash.substr(7))
  })
}

const checkIfExist = function (token) {
  return forgotpass.ForgotPassword.findOne({
    where: {token: token}
  })
}

const forgotPassword = function (req, res) {
  console.log(req.body.email)
  // 10 rounds used for salt, needs to be tested and optimized
  users.findUser(req.body.email, function (err, user) {
    if (err || user === null) {
      res.json({
        message: 'Failed to reset password'
      })
      return
    }
    generateToken(req.body.email, function (token) {
      sequelize.sync()
        .then(() => forgotpass.ForgotPassword.create({
          userid: user.id,
          token: token
        }))
        .then(() => {
          res.json({
            passwordToken: token
          })
        })
    })
  })
}

const removeEntry = function (token) {
  forgotpass.ForgotPassword.destroy({
    where: {token: token}
  }).then(() => {})
}

const resetPassword = function (res, user, password, passwordToken) {
  if (user === null) {  // We should never get here
    res.json({
      success: false,
      message: 'Failed to find user, please contact the site admin'
    })
  } else {
    users.setNewPassword(user, password)
    removeEntry(passwordToken)
    user.save().then(() => {
      res.json({
        success: true,
        message: 'Password changed'
      })
    })
  }
}

const setNewPassword = function (req, res) {
  if (req.body.password === null) {
    res.json({
      success: false,
      message: 'Must contain a password'
    })
    return
  }
  checkIfExist(req.body.passwordToken)
    .then((reset) => {
      if (reset === null) {
        res.json({
          success: false,
          message: 'Failed to set new password'
        })
        return
      }
      users.User.findOne({
        where: {id: reset.userid}
      })
        .then((user) => resetPassword(res, user, req.body.password, req.body.passwordToken))
    })
}

module.exports = {
  forgotPassword,
  setNewPassword
}
