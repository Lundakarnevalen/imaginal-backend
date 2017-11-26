'use strict'

const users = require('../models/users')

const registerUser = function (req, res) {
  if (req.body.email && req.body.password) {
    users.User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (user !== null) {
          return res.json({
            success: false,
            message: 'User already exists'
          })
        }
        createUser(req.body.email, req.body.password, res)
      })
  } else {
    res.status(400).json({
      success: false,
      message: 'Missing parameters'
    })
  }
}

const createUser = function (email, password, res) {
  users.User.create({
    email: email,
    name: '',
    address: '',
    postNumber: '',
    city: '',
    careOf: '',
    personalNumber: ''
  })
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
