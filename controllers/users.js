'use strict'

const users = require('../models/users')
const Checkin = require('../models/checkin').Checkin
const UserRoles = require('../models/userrole')

const getAll = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')

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

  const allUsers = await users.User.findAll({
    order: ['id'],
    offset: offset,
    limit: limit,
    include: [
      { model: users.KarnevalistInfo },
      { model: Checkin, as: 'Checkin', attributes: ['checkerId', 'createdAt'] }
    ]
  })

  res.json({
    success: true,
    users: allUsers.map(user => user.toJSON()).map(user => {
      user.checkedIn = !!user.Checkin
      return user
    })
  })
}

const getById = async (req, res) => {
  const identification = req.params.identification

  if (!identification) {
    return res.status(400).json({
      success: false,
      message: 'Missing identification parameter'
    })
  }

  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')

  if (
    !(
      isAdmin ||
      (identification === req.user.email ||
        identification === req.user.personalNumber)
    )
  ) {
    return res.status(401).json({
      success: false,
      message: 'Admin privileges required'
    })
  }

  /** We may need this later, not sure
   let user = await users.User.findOne({
    where: {
      $or: [
        {personalNumber: identification},
        {email: identification}
      ]
    },
    include: [
      {model: users.KarnevalistInfo},
      {model: Checkin, as: 'Checkin', attributes: ['checkerId', 'createdAt']}
    ]
    */
  const user = await users.User.findOne({
    where: {
      $or: [{ personalNumber: identification }, { email: identification }]
    }
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'No such user'
    })
  }

  const checkedIn = await users.isCheckedIn(user)
  const allRoles = await user.getRoles()
  const roles = await allRoles.map(role => role.toJSON()).map(role => {
    return role
  })

  const karnevalistInfo = await users.KarnevalistInfo.findOne({
    where: { userId: user.id },
    attributes: [
      'language',
      'driversLicense',
      'foodPreference',
      'disability',
      'corps',
      'startOfStudies',
      'pastInvolvement',
      'groupLeader',
      'misc',
      'plenipotentiary',
      'bff',
      'studentNation'
    ]
  })

  const userinfo = {
    checkedIn,
    ...user.toJSON(),
    ...karnevalistInfo.dataValues,
    roles: [...roles]
  }

  return res.json({
    success: true,
    userinfo,
    user: userinfo // compability with app
  })
}

const setUserInfo = async (req, res) => {
  const email = req.params.email
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')

  if (!isAdmin && email !== req.user.email) {
    return res.status(401).json({
      success: false,
      message: 'Permission denied'
    })
  }

  const user = await users.User.findOne({
    where: { email },
    include: [{ model: users.KarnevalistInfo }]
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'No such user'
    })
  }

  // All editable user fields
  const fields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'postNumber',
    'city',
    'careOf',
    'shirtSize'
  ]

  // All editable karnevalistInfo fields
  const entryFields = [
    'language',
    'driversLicense',
    'foodPreference',
    'disability',
    'corps',
    'startOfStudies',
    'pastInvolvement',
    'groupLeader',
    'misc',
    'plenipotentiary',
    'bff',
    'studentNation'
  ]

  const entry = user.KarnevalistInfo

  fields.forEach(key => (user[key] = req.body[key] || user[key]))
  entryFields.forEach(key => (entry[key] = req.body[key] || entry[key]))

  await user.save()
  await entry.save()

  return res.json({
    success: true,
    message: 'User info updated'
  })
}

module.exports = {
  getAll,
  getById,
  setUserInfo
}
