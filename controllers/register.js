'use strict'

const users = require('../models/users')
const role = require('../models/role')
const userrole = require('../models/userrole')

const registerUser = function (req, res) {
  if (req.body.email && req.body.password) {
    users.User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (user !== null) {
          return res.status(400).json({
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

let finalUser
let finalRole

const createUser = function (email, password, res) {
  users.User.create({
    email: email,
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    postNumber: '',
    city: '',
    careOf: '',
    personalNumber: ''
  })
  .then(user => {
    finalUser = user
    users.setNewPassword(user, password)
    res.json({
      success: true,
      message: 'You are now registered'
    })
  })
  .then((user) => {
    //create KarnevalInfo entry here
  })
  .then(() => role.Role.create({
    Description: 'karnevalist'
  }))
  .then(role => {
    finalRole = role
  })
  .then(() => userrole.UserRole.create({
    UserId: finalUser.id,
    RoleId: finalRole.id
  }))
}

module.exports = {
  registerUser
}
