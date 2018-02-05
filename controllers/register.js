'use strict'

const users = require('../users/users')
const usersService = require('../users/usersService')
const role = require('../models/role')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/database')

const registerUser = function (req, res) {
  const error = []
  if (!req.body.personalNumber || req.body.personalNumber.length !== 10) {
    error.push('personalNumber')
  }
  if (!req.body.email || !req.body.email.includes('@')) {
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

const createUser = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const token = await jwt.sign({email: req.body.email}, process.env.TOKEN_SECRET || 'secret')
    const user = await users.User.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber || '',
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      address: req.body.address || '',
      postNumber: req.body.postNumber || '',
      city: req.body.city || '',
      careOf: req.body.careOf || '',
      personalNumber: req.body.personalNumber || '',
      shirtSize: req.body.shirtSize || '',
      token
    })

    await user.createKarnevalistInfo({
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
      bff: req.body.bff || '',
      studentNation: req.body.studentNation || ''
    }, {t})

    const ourRole = await role.Role.findOne({
      where: {Description: 'karnevalist'}
    }, {t})

    await user.addRole([ourRole], {t})

    usersService.setUserSkillsAndTalents(user, req.body.interest, req.body.skills,
      req.body.bigPleasures, req.body.smallPleasures, t)

    await user.setNewPassword(req.body.password)
    await t.commit()

    return res.json({
      success: true,
      message: 'You are now registered with email ' + user.email,
      accessToken: user.token
    })
  } catch (err) {
    await t.rollback()
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to register'
    })
  }
}

module.exports = {
  registerUser
}
