'use strict'

const users = require('../models/users')
const forgotPass = require('../models/forgotpassword').ForgotPassword
const crypto = require('crypto')

const checkIfExist = function (email, token) {
  return forgotPass.findOne({
    where: {email: email, token: token}
  })
}

const forgotPassword = function (req, res) {
  users.User.findOne({
    where: {email: req.body.email}
  })
  .then((user) => {
    if (!user) {
      return res.json({
        success: false,
        message: 'Failed to reset password'
      })
    }

    crypto.randomBytes(255, (err, buf) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to reset password'
        })
      }

      const token = buf.toString('hex').substr(255)

      forgotPass.findOne({
        where: {email: user.email}
      })
      .then((passwordToken) => {
        if (!passwordToken) {
          forgotPass.create({email: user.email, token: token})
        } else {
          passwordToken.update({email: user.email, token: token})
        }
        res.json({
          success: true,
          passwordToken: token
        })
      })
    })
  })
}

const removeEntry = function (email, token) {
  return forgotPass.destroy({
    where: {email: email, token: token}
  })
}

const resetPassword = function (res, user, password, passwordToken) {
  if (!user) {
    return res.json({
      success: false,
      message: 'Failed to find user'
    })
  }
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

const setNewPassword = function (req, res) {
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'Must contain a password'
    })
  }
  checkIfExist(req.body.email, req.body.passwordToken)
    .then((reset) => {
      if (reset === null) {
        return res.json({
          success: false,
          message: 'Failed to set new password'
        })
      }
      users.User.findOne({
        where: {email: reset.email}
      })
      .then((user) => {
        resetPassword(res, user, req.body.password, req.body.passwordToken)
      })
    })
}

module.exports = {
  forgotPassword,
  setNewPassword
}
