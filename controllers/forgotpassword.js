'use strict'

const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const forgotpass = require('../models/forgotpassword')
const bcrypt = require('bcrypt')

let generateToken = function (email, callback) {
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

let checkIfExist = function (token) {
  return forgotpass.ForgotPassword.findOne({
    where: {token: token}
  })
}

let forgotPassword = function (req, res) {
  console.log(req.body.email)
  // 10 rounds used for salt, needs to be tested and optimized
  users.findUser(req.body.email, function (err, user) {
    if (err || user === null) {
      let resp = {}
      resp.message = 'Failed to reset password'
      res.send(resp)
      return
    }
    generateToken(req.body.email, function (token) {
      sequelize.sync()
        .then(() => forgotpass.ForgotPassword.create({
          userid: user.id,
          token: token
        }))
        .then(() => {
          let resp = {}
          resp.passwordToken = token
          res.send(resp)
        })
    })
  })
}

let removeEntry = function (token) {
  forgotpass.ForgotPassword.destroy({
    where: {token: token}
  }).then(() => {})
}

let resetPassword = function (res, user, password, passwordToken) {
  let resp = {}
  if (user === null) {  // We should never get here
    resp.success = false
    resp.message = 'Failed to find user, please contact the site admin'
    res.send(resp)
  } else {
    users.setNewPassword(user, password)
    removeEntry(passwordToken)
    user.save().then(() => {
      resp.success = true
      resp.message = 'Password changed'
      res.send(resp)
    })
  }
}

let setNewPassword = function (req, res) {
  let resp = {}
  resp.success = false
  if (req.body.password === null) {
    resp.message = 'Must contain a password'
    res.send(resp)
    return
  }
  checkIfExist(req.body.passwordToken)
    .then((reset) => {
      if (reset === null) {
        resp.message = 'Failed to set new password'
        res.send(resp)
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
