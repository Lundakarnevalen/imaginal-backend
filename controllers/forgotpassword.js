'use strict'

const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const forgotpass = require('../models/forgotpassword')
const bcrypt = require('bcrypt')

/**
 * Generates a passwordToken
 * @param email Email of the user
 * @param callback The callback function. Should take 1 argument that will contain the token
 */
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

/**
 * Update if exist, otherwise insert
 * @param values The new values
 * @param conditions The where clause
 */
const upsert = function (values, conditions) {
  forgotpass.ForgotPassword.findOne({
    where: conditions
  }).then((passwordToken) => {
    if (!passwordToken) {
      sequelize.sync()
        .then(() => forgotpass.ForgotPassword.create(values
        ))
    } else {
      passwordToken.update(values)
    }
  })
}

const forgotPassword = function (req, res) {
  users.findUser(req.body.email, function (err, user) {
    if (err || user === null) {
      res.json({
        success: false,
        message: 'Failed to reset password'
      })
      return
    }
    generateToken(req.body.email, function (token) {
      forgotpass.ForgotPassword.findOne({
      })
      upsert({email: user.email,
        token: token}, {email: user.email})
      sequelize.sync()
        .then(() => forgotpass.ForgotPassword.create({
          userid: user.id,
          token: token
        }))
        .then(() => {
          res.json({
            success: true,
            passwordToken: token
          })
        })
    })
  })
}

const removeEntry = function (token) {
  return forgotpass.ForgotPassword.destroy({
    where: {token: token}
  })
}

const resetPassword = function (res, user, password, passwordToken) {
  if (user === null) {  // We should never get here
    res.json({
      success: false,
      message: 'Failed to find user, please contact the site admin'
    })
  } else {
    removeEntry(passwordToken).then(() => {
      users.setNewPassword(user, password)
      user.save().then(() => {
        res.json({
          success: true,
          message: 'Password changed'

        })
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
        where: {email: reset.email}
      }).then((user) => resetPassword(res, user, req.body.password, req.body.passwordToken))
    })
}

module.exports = {
  forgotPassword,
  setNewPassword
}
