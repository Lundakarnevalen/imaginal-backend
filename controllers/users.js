'use strict'

const users = require('../models/users')

const getAll = function (req, res) {
  // TODO: check if admin
  users.User.findAll({
    attributes: ['id', 'email', 'name', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber']
  }).then(allUsers => {
    res.json({
      success: true,
      users: allUsers
    })
  })
}

const getById = function (req, res) {
  if (!req.params.email) {
    return res.status(400).json({
      success: false,
      message: 'Missing user email'
    })
  }
  if (req.params.email === req.user.email) {
    const myuser = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      phoneNumber: req.user.phoneNumber,
      address: req.user.address,
      postNumber: req.user.postNumber,
      city: req.user.city,
      careOf: req.user.careOf,
      personalNumber: req.user.personalNumber
    }
    return res.json({
      success: true,
      user: myuser
    })
  }
  // TODO: check if admin
  users.User.findOne({
    attributes: ['id', 'email', 'name', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber'],
    where: { email: req.params.email }
  }).then(user => {
    res.json({
      success: true,
      user
    })
  })
}

module.exports = {
  getAll,
  getById
}
