'use strict'

const sequelize = require('../config/database.js').dbc
const users = require('../models/users')
const forgotpass = require('../models/forgotpassword')
const crypto = require('crypto')

const checkIfExist = function (email, token) {
  return forgotpass.ForgotPassword.findOne({
    where: {email: email, token: token}
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
      forgotpass.ForgotPassword.create(values
      )
    } else {
      passwordToken.update(values)
    }
  })
}

const forgotPassword = function (req, res) {
  users.findUser(req.body.email, function (err, user) {
    if (err || user === null) {
      return res.json({
        success: false,
        message: 'Failed to reset password'
      })
    }
    crypto.randomBytes(255, (err, buf) => {
      if (err) {
        throw err
      }
      const token = buf.toString('hex').substr(255)
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

const removeEntry = function (email, token) {
  return forgotpass.ForgotPassword.destroy({
    where: {email: email, token: token}
  })
}

const resetPassword = function (res, user, password, passwordToken) {
  if (user === null) {  // We should never get here
    res.json({
      success: false,
      message: 'Failed to find user, please contact the site admin'
    })
  } else {
    removeEntry(user.email, passwordToken).then(() => {
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
  checkIfExist(req.body.email, req.body.passwordToken)
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
