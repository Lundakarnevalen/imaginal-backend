'use strict'

const users = require('../users/users')
const forgotPass = require('../models/forgotpassword').ForgotPassword
const crypto = require('crypto')
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

const awsConfig = {
  'accessKeyId': process.env.AWS_ACCESS_ID,
  'secretAccessKey': process.env.AWS_ACCESS_KEY
}
AWS.config.update(awsConfig)
const sender = 'auto-mail@lundakarnevalen.se'

const sendEmail = (email, token) => {
  return new Promise((resolve, reject) => {
    const template = fs.readFileSync(path.resolve(__dirname, '../templates/resetEmail.mustache'))
    const msg = mustache.render(template.toString(), {resetPasswordHash: token})
    const params = {
      Destination: {
        ToAddresses: [ email ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: msg
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Karnevalist - Reset password'
        }
      },
      Source: sender
    }

    const ses = new AWS.SES({apiVersion: '2010-12-01', region: 'eu-west-1'})
    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const checkIfExist = function (email, token) {
  return forgotPass.findOne({
    where: {email: email, token: token}
  })
}

const forgotPassword = async (req, res) => {
  const user = await users.User.findOne({
    where: {email: req.body.email}
  })
  if (!user) {
    // If there is no user, pretend that there is
    // to avoid username fishing
    return res.json({
      success: true,
      message: 'Email sent'
    })
  }

  crypto.randomBytes(255, async (err, buf) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to reset password'
      })
    }

    const token = buf.toString('hex').substr(0, 64)

    const passwordToken = await forgotPass.findOne({
      where: {email: user.email}
    })
    if (!passwordToken) {
      await forgotPass.create({email: user.email, token: token})
    } else {
      await passwordToken.update({email: user.email, token: token})
    }

    try {
      await sendEmail(user.email, token)
      res.json({
        success: true,
        message: 'Email sent'
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        success: false,
        message: 'Failed to reset password'
      })
    }
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
    user.setNewPassword(password)
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
