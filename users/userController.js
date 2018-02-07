'use strict'

const users = require('./users')
const UserRoles = require('../models/userrole')
const userService = require('./usersService')

const getAll = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }

  const offset = parseInt(req.query.offset) || 0
  const limit = 25
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const allUsers = await users.getAllUsersAndCount(offset, limit)
  const allUserJSON = await Promise.all(allUsers.rows.map(async (user) => { return user.toJSON() }))

  res.json({
    success: true,
    users: allUserJSON,
    count: allUsers.count
  })
}

const getById = async (req, res) => {
  const identification = req.params.identification
  try {
    if (!identification) {
      return res.status(400).json({
        success: false,
        message: 'Missing identification parameter'
      })
    }

    const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)
    if (!(isAdmin ||
        (identification === req.user.email || identification === req.user.personalNumber))) {
      return res.status(401).json({
        success: false,
        message: 'Admin privileges required'
      })
    }
    const user = await users.getUserByIdentification(identification)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No such user'
      })
    }

    const userinfo = await user.toJSON()
    return res.json({
      success: true,
      userinfo,
      user: userinfo // compability with app
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    })
  }
}

const setUserInfo = async (req, res) => {
  try {
    const email = req.params.email
    const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

    if (!isAdmin && email !== req.user.email) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied'
      })
    }

    const user = await users.getUserByIdentification(email)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No such user'
      })
    }

    await userService.setAndUpdateUserInformation(user, req.body)
    await userService.setUserSkillsAndTalents(user, req.body.interest, req.body.skills,
      req.body.bigPleasures, req.body.smallPleasures)

    return res.json({
      success: true,
      message: 'User info updated'
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to update user info'
    })
  }
}

module.exports = {
  getAll,
  getById,
  setUserInfo
}
