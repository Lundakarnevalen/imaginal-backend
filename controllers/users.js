'use strict'

const users = require('../models/users')
const Checkin = require('../models/checkin').Checkin
const UserRoles = require('../models/userrole')
const sequelize = require('../config/database')
const Skills = require('../models/skills').Skills
const BigPleasures = require('../models/bigpleasures').BigPleasures
const SmallPleasures = require('../models/smallpleasures').SmallPleasures
const Interest = require('../models/interests').Interests

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
  const t = await sequelize.transaction()
  try {
    if (!identification) {
      return res.status(400).json({
        success: false,
        message: 'Missing identification parameter'
      })
    }

    const isAdmin = await UserRoles.hasRole(req.user, 'administrator', {t})

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

    const user = await users.User.findOne({
      where: {
        $or: [{personalNumber: identification}, {email: identification}]
      }
    }, {t})

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No such user'
      })
    }

    const checkedIn = await users.isCheckedIn(user)
    const allRoles = await user.getRoles({t})
    const roles = await allRoles.map(role => role.toJSON()).map(role => {
      return role
    })

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
    }, {t})

    const skills = await user.getUserSkill({t}).map(skill => skill.toJSON().skill)
    const interests = await user.getUserInterest({t}).map(interest => interest.toJSON().interest)
    const bigPleasures = await user.getUserBigAudition({t}).map(pleasure => pleasure.toJSON().audition)
    const smallPleasures = await user.getUserSmallAudition({t}).map(pleasure => pleasure.toJSON().audition)

    await t.commit()
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
    console.error(err)
    t.rollback()
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    })
  }
}

const setUserInfo = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const email = req.params.email
    const isAdmin = await UserRoles.hasRole(req.user, 'administrator')

    if (!isAdmin && email !== req.user.email) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied'
      })
    }

    const user = await users.User.findOne({
      where: {email},
      include: [{model: users.KarnevalistInfo}]
    }, {t})

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

    fields.forEach(key => (user[key] = req.body[key]))
    entryFields.forEach(key => (entry[key] = req.body[key]))

    const isValidArray = (input) => {
      return input && Array.isArray(input)
    }

    const createFromArray = async (data, table, col) => {
      for (let val of data) {
        await table.create({
          userId: user.dataValues.id,
          [col]: val
        }, {t})
      }
    }

    /** TODO: This is the same code as in register.js, we need to refactor stuff */
    Skills.destroy({where: {userId: user.id}}, {t})
    BigPleasures.destroy({where: {userId: user.id}}, {t})
    SmallPleasures.destroy({where: {userId: user.id}}, {t})
    Interest.destroy({where: {userId: user.id}}, {t})

    if (isValidArray(req.body.interest)) {
      await createFromArray(req.body.interest, Interest, 'interest')
    }

    if (isValidArray(req.body.skills)) {
      await createFromArray(req.body.skills, Skills, 'skill')
    }

    if (isValidArray(req.body.bigPleasures)) {
      await createFromArray(req.body.bigPleasures, BigPleasures, 'audition')
    }

    if (isValidArray(req.body.smallPleasures)) {
      await createFromArray(req.body.smallPleasures, SmallPleasures, 'audition')
    }

    await user.save({t})
    await entry.save({t})
    await t.commit()

    return res.json({
      success: true,
      message: 'User info updated'
    })
  } catch (err) {
    console.error(err)
    t.rollback()
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
