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
        success: true,
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
        success: true,
        message: 'Unauthorized'
      })
    }
  })
}

module.exports = {
  getAll,
  getById
}
