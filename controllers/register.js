'use strict'

const users = require('../models/users')
const role = require('../models/role')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/database')

const registerUser = function (req, res) {
  const error = []
  if (!req.body.personalNumber || req.body.personalNumber.length !== 10) {
    error.push('personalNumber')
  }
  if (!req.body.email) {
    error.push('email')
  }
  if (!req.body.password) {
    error.push('password')
  }
  if (error.length !== 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters',
      error
    })
  }

  users.User.findAll({
    where: {
      $or: [{personalNumber: req.body.personalNumber}, {email: req.body.email}]
    }
  }).then((users) => {
    if (users.length > 0) {
      users.forEach((user) => {
        if (user.email === req.body.email) { error.push('email') }
        if (user.personalNumber === req.body.personalNumber) { error.push('personalNumber') }
      })

      return res.status(409).json({
        success: false,
        message: 'User already exists',
        error
      })
    }
    createUser(req, res)
  })
}

const createUser = function (req, res) {
  let finalUser
  sequelize.transaction(function (t) {
    return users.User.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber || '',
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      address: req.body.address || '',
      postNumber: req.body.postNumber || '',
      city: req.body.city || '',
      careOf: req.body.careOf || '',
      personalNumber: req.body.personalNumber || ''
    }, {transaction: t})
      .then(user => {
        users.setNewPassword(user, req.body.password)
        user.token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET || 'secret')
        finalUser = user
      })
      .then(() => finalUser.createKarnevalistInfo({
        language: req.body.language || '',
        driversLicense: req.body.driversLicense || '',
        foodPreference: req.body.foodPreference || '',
        disability: req.body.disability || '',
        audition: req.body.audition || '',
        talent: req.body.talent || '',
        entertainmentCategory: req.body.entertainmentCategory || '',
        corps: req.body.corps || '',
        startOfStudies: req.body.startOfStudies || '',
        pastInvolvement: req.body.pastInvolvement || '',
        groupLeader: req.body.groupLeader || '',
        interests: req.body.interests || '',
        misc: req.body.misc || '',
        plenipotentiary: req.body.plenipotentiary || ''
      }, {transaction: t}))
      .then(() => {
        return role.Role.findOne({
          where: {Description: 'karnevalist'}
        }, {transaction: t})
      })
      .then((role) => {
        return finalUser.addRole([role], {transaction: t})
      })
  })
    .then(() => {
      res.json({
        success: true,
        message: 'You are now registered with email ' + finalUser.email,
        accessToken: finalUser.token
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Failed to register'
      })
    })
}

module.exports = {
  registerUser
}
