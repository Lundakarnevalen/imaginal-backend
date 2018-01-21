'use strict'

const users = require('../models/users')
const UserRoles = require('../models/userrole')

const getAll = function (req, res) {
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin) {
      const offset = parseInt(req.query.offset) || 0
      const limit = 25
      if (offset < 0) {
        return res.status(500).json({
          success: false,
          message: 'Invalid offset'
        })
      }
      users.User.findAll({
        order: ['id'],
        offset: offset,
        limit: limit,
        attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber'],
        include: [{model: users.KarnevalistInfo}]
      }).then(allUsers => {
        res.json({
          success: true,
          users: allUsers.map((user) => user.toJSON())
        })
      })
    } else {
      res.status(401).json({
        success: false,
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
    require('../models/users').isCheckedIn(req.user).then((checkedIn) => {
      let user = req.user.toJSON()
      user['checkedIn'] = checkedIn
      return res.json({
        success: true,
        user: user
      })
    })
  } else {
    UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
      if (isadmin) {
        users.User.findOne({
          attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber'],
          where: {email: req.params.email},
          include: [{model: users.KarnevalistInfo}]
        }).then(user => {
          if (user) {
            return res.json({
              success: true,
              user
            })
          }
          return res.status(400).json({
            success: false,
            message: 'User not found'
          })
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        })
      }
    })
  }
}

const setUserInfo = function (req, res) {
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    return new Promise((resolve, reject) => {
      if (!isadmin) {
        if (req.params.email !== req.user.email) {
          return res.status(401).json({
            success: false,
            message: 'Permission denied'
          })
        }
        resolve(req.user)
      } else {
        users.User.findOne({
          where: {email: req.params.email},
          include: [{model: users.KarnevalistInfo}]
        })
        .then((dbuser) => { resolve(dbuser) })
      }
    })
  })
  .then((user) => {
    let entry = user.KarnevalistInfo
    if (req.body.firstName) req.user.firstName = req.body.firstName
    if (req.body.lastName) req.user.lastName = req.body.lastName
    if (req.body.phoneNumber) req.user.phoneNumber = req.body.phoneNumber
    if (req.body.address) req.user.address = req.body.address
    if (req.body.postNumber) req.user.postNumber = req.body.postNumber
    if (req.body.city) req.user.city = req.body.city
    if (req.body.careOf) req.user.careOf = req.body.careOf
    if (req.body.personalNumber) req.user.personalNumber = req.body.personalNumber

    if (req.body.language) entry.language = req.body.language
    if (req.body.driversLicense) entry.driversLicense = req.body.driversLicense
    if (req.body.foodPreference) entry.foodPreference = req.body.foodPreference
    if (req.body.disability) entry.disability = req.body.disability
    if (req.body.audition) entry.audition = req.body.audition
    if (req.body.talent) entry.talent = req.body.talent
    if (req.body.entertainmentCategory) entry.entertainmentCategory = req.body.entertainmentCategory
    if (req.body.corps) entry.corps = req.body.corps
    if (req.body.startOfStudies) entry.startOfStudies = req.body.startOfStudies
    if (req.body.pastInvolvement) entry.pastInvolvement = req.body.pastInvolvement
    if (req.body.groupLeader) entry.groupLeader = req.body.groupLeader
    if (req.body.interests) entry.interests = req.body.interests
    if (req.body.misc) entry.misc = req.body.misc
    if (req.body.plenipotentiary) entry.plenipotentiary = req.body.plenipotentiary
    user.save().then(() => entry.save())
    .then(() => {
      return res.json({
        success: true,
        message: 'User info updated'
      })
    })
  })
}

module.exports = {
  getAll,
  getById,
  setUserInfo
}
