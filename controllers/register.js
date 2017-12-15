'use strict'

const users = require('../models/users')
const role = require('../models/role')
const userrole = require('../models/userrole')
const karnevalistinfo = require('../models/karnevalistinfo')
const jwt = require('jsonwebtoken')

const registerUser = function (req, res) {
  if (req.body.email && req.body.password) {
    users.User.findOne({
      where: {email: req.body.email}
    })
      .then((user) => {
        if (user !== null) {
          return res.status(400).json({
            success: false,
            message: 'User already exists'
          })
        }
        createUser(req, res)
      })
  } else {
    res.status(400).json({
      success: false,
      message: 'Missing parameters'
    })
  }
}

const createUser = function (req, res) {
  let finalUser
  users.User.create({
    email: req.body.email,
    phoneNumber: req.body.postNumber || '',
    firstName: req.body.firstName || '',
    lastName: req.body.firstName || '',
    address: req.body.firstName || '',
    postNumber: req.body.firstName || '',
    city: req.body.firstName || '',
    careOf: req.body.firstName || '',
    personalNumber: req.body.firstName || ''
  })
    .then(user => {
      finalUser = user
      users.setNewPassword(user, req.body.password)
      user.token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET || 'secret')
      return user
    })
    .then((user) => karnevalistinfo.KarnevalistInfo.create({
      user_id: user.id,
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
    }))
    .then(() => role.Role.findOne({
      where: {Description: 'karnevalist'}
    }))
    .then((role) => userrole.UserRole.create({
      UserId: finalUser.id,
      RoleId: role.id
    }))
    .then(() => {
      res.json({
        success: true,
        message: 'You are now registered with email ' + finalUser.email,
        accessToken: finalUser.token
      })
    })
}

module.exports = {
  registerUser
}
