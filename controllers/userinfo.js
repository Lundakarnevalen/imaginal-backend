'use strict'

const users = require('../models/users')

let setUserInfo = function (req, res) {
  users.User.findOne({
    where: { email: req.body.email }
  }).then((user) => {
    user.name = req.body.name
    user.address = req.body.address
    user.personalNumber = req.body.personalNumber
    user.save().then(() => {
      res.json({
        success: true,
        message: 'User info updated'
      })
    })
  })
}

module.exports = {
  setUserInfo
}