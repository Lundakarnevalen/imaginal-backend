'use strict'

const users = require('../models/users')
const role = require('../models/role')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/database')
const Interest = require('../models/interests').Interests
const Skills = require('../models/skills').Skills
const SmallPleasures = require('../models/smallpleasures').SmallPleasures
const BigPleasures = require('../models/bigpleasures').BigPleasures

const registerUser = function (req, res) {
  let error = []
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
      error = []

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
      personalNumber: req.body.personalNumber || '',
      shirtSize: req.body.shirtSize || ''
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
        corps: req.body.corps || '',
        startOfStudies: req.body.startOfStudies || '',
        pastInvolvement: req.body.pastInvolvement || '',
        groupLeader: req.body.groupLeader || false,
        misc: req.body.misc || '',
        plenipotentiary: req.body.plenipotentiary || false,
        bff: req.body.bff || ''
      }, {transaction: t}))
      .then(() => {
        return role.Role.findOne({
          where: {Description: 'karnevalist'}
        }, {transaction: t})
      })
      .then((role) => {
        return finalUser.addRole([role], {transaction: t})
      }).then(() => {
        if (typeof req.body.interest !== 'undefined' && req.body.interest.length > 0) {
          req.body.interest.map(inter => {
            Interest.create({
              userId: finalUser.dataValues.id,
              interest: inter
            }, {transaction: t})
          })
        }
      }).then(() => {
        if (typeof req.body.skills !== 'undefined' && req.body.skills.length > 0) {
          req.body.skills.map(skill => {
            Skills.create({
              userId: finalUser.dataValues.id,
              skill: skill
            }, {transaction: t})
          })
        }
      }).then(() => {
        if (typeof req.body.smallPleasures !== 'undefined' && req.body.smallPleasures.length > 0) {
          req.body.smallPleasures.map(audition => {
            SmallPleasures.create({
              userId: finalUser.dataValues.id,
              audition: audition
            }, {transaction: t})
          })
        }
      }).then(() => {
        if (typeof req.body.bigPleasures !== 'undefined' && req.body.bigPleasures.length > 0) {
          req.body.bigPleasures.map(audition => {
            BigPleasures.create({
              userId: finalUser.dataValues.id,
              audition: audition
            }, {transaction: t})
          })
        }
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
  })
}

module.exports = {
  registerUser
}
