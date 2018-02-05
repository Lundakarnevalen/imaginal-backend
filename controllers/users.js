'use strict'

const users = require('../models/users')
const Checkin = require('../models/checkin').Checkin
const UserRoles = require('../models/userrole')
const Skills = require('../models/skills').Skills
const BigPleasures = require('../models/bigpleasures').BigPleasures
const SmallPleasures = require('../models/smallpleasures').SmallPleasures
const Interest = require('../models/interests').Interests

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

  const allUsers = await users.User.findAndCountAll({
    order: ['id'],
    offset: offset,
    limit: limit,
    include: [
      {model: users.KarnevalistInfo},
      {model: Checkin, as: 'Checkin', attributes: ['checkerId', 'createdAt']}
    ]
  })

  res.json({
    success: true,
    users: allUsers.rows.map(user => user.toJSON()).map(user => {
      user.checkedIn = !!user.Checkin
      return user
    }),
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

    const user = await users.User.findOne({
      where: {
        $or: [{personalNumber: identification}, {email: identification}]
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
    const roles = await allRoles.map(role => role.toJSON())

    const karnevalistInfo = await users.KarnevalistInfo.findOne({
      where: {userId: user.id},
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

    const skills = await user.getUserSkill().map(skill => skill.toJSON().skill)
    const interests = await user.getUserInterest().map(interest => interest.toJSON().interest)
    const bigPleasures = await user.getUserBigAudition().map(pleasure => pleasure.toJSON().audition)
    const smallPleasures = await user.getUserSmallAudition().map(pleasure => pleasure.toJSON().audition)

    const userinfo = {
      checkedIn,
      ...user.toJSON(),
      ...karnevalistInfo.dataValues,
      roles: [...roles],
      skills,
      interests,
      bigPleasures,
      smallPleasures
    }

    return res.json({
      success: true,
      userinfo,
      user: userinfo // compability with app
    })
  } catch (err) {
    console.err(err)
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

    const user = await users.User.findOne({
      where: {email},
      include: [{model: users.KarnevalistInfo}]
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

    fields.forEach(key => {
      if (req.body.hasOwnProperty(key)) {
        user[key] = req.body[key]
      }
    })

    entryFields.forEach(key => {
      if (req.body.hasOwnProperty(key)) {
        entry[key] = req.body[key]
      }
    })

    const isValidArray = (input) => {
      return input && Array.isArray(input)
    }

    const createFromArray = async (data, table, col) => {
      for (let val of data) {
        await table.create({
          userId: user.dataValues.id,
          [col]: val
        })
      }
    }

    /** TODO: This is the same code as in register.js, we need to refactor stuff */

    if (isValidArray(req.body.interest)) {
      await Interest.destroy({where: {userId: user.id}})
      await createFromArray(req.body.interest, Interest, 'interest')
    }

    if (isValidArray(req.body.skills)) {
      await Skills.destroy({where: {userId: user.id}})
      await createFromArray(req.body.skills, Skills, 'skill')
    }

    if (isValidArray(req.body.bigPleasures)) {
      await BigPleasures.destroy({where: {userId: user.id}})
      await createFromArray(req.body.bigPleasures, BigPleasures, 'audition')
    }

    if (isValidArray(req.body.smallPleasures)) {
      await SmallPleasures.destroy({where: {userId: user.id}})
      await createFromArray(req.body.smallPleasures, SmallPleasures, 'audition')
    }

    await user.save()
    await entry.save()

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
