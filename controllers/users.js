'use strict'

const users = require('../models/users')
const UserRoles = require('../models/userrole')

const getAll = function (req, res) {
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin) {
      users.User.findAll({
        attributes: ['id', 'email', 'name', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber']
      }).then(allUsers => {
        res.json({
          success: true,
          users: allUsers
        })
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }
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
      firstName: req.user.firstName,
      lastName: req.user.lastName,
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

  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin) {
      users.User.findOne({
        attributes: ['id', 'email', 'name', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber'],
        where: {email: req.params.email}
      }).then(user => {
        res.json({
          success: true,
          user
        })
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }
  })
}

const setUserInfo = function (req, res) {
  if (req.params.email === req.user.email) {
    if (req.body.firstName) req.user.firstName = req.body.firstName
    if (req.body.lastName) req.user.lastName = req.body.lastName
    if (req.body.phoneNumber) req.user.phoneNumber = req.body.phoneNumber
    if (req.body.address) req.user.address = req.body.address
    if (req.body.postNumber) req.user.postNumber = req.body.postNumber
    if (req.body.city) req.user.city = req.body.city
    if (req.body.careOf) req.user.careOf = req.body.careOf
    if (req.body.personalNumber) req.user.personalNumber = req.body.personalNumber
    req.user.save().then(() => {
      return res.json({
        success: true,
        message: 'User info updated'
      })
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Permission denied'
    })
  }
}

module.exports = {
  getAll,
  getById,
  setUserInfo
}
