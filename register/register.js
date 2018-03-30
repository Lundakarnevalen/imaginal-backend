'use strict'

const users = require('../users/users')
const usersService = require('../users/usersService')
const role = require('../role/role')
const sequelize = require('../config/database')
const registerSerice = require('./registerService')

const registerUser = async (req, res) => {
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

  const userByPIN = await users.getUserByIdentification(req.body.personalNumber)
  const userByEmail = await users.getUserByIdentification(req.body.email)
  if (userByPIN) {
    error.push('personalNumber')
  }
  if (userByEmail) {
    error.push('email')
  }

  if (error.length > 0) {
    return res.status(409).json({
      success: false,
      message: 'User already exists',
      error
    })
  }

  createUser(req, res)
}

const createUser = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const user = await registerSerice.createUser(req, t)

    /** TODO: Add this to roleService */
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
