const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')

const User = dbc.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  address: Sequelize.STRING,
  postNumber: Sequelize.STRING,
  city: Sequelize.STRING,
  careOf: Sequelize.STRING,
  personalNumber: Sequelize.STRING
})

const KarnevalistInfo = dbc.define('KarnevalistInfo', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  language: Sequelize.STRING,
  driversLicense: Sequelize.STRING,
  foodPreference: Sequelize.STRING,
  disability: Sequelize.STRING,
  audition: Sequelize.STRING,
  talent: Sequelize.STRING,
  entertainmentCategory: Sequelize.STRING,
  corps: Sequelize.STRING,
  startOfStudies: Sequelize.STRING,
  pastInvolvement: Sequelize.STRING,
  groupLeader: Sequelize.STRING,
  interests: Sequelize.STRING,
  misc: Sequelize.STRING,
  plenipotentiary: Sequelize.STRING
})

// This adds UserId to KarnevalistInfo as foreign key
User.hasOne(KarnevalistInfo)

const setNewPassword = function (user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err)
        return
      }
      user.password = hash
      user.save().then(resolve).catch(reject)
    })
  })
}

/** TODO: Make this an istancedMethod, which I can't get to work */
const isCheckedIn = function (user) {
  'use strict'
  return user.getChecker().then((checker) => {
    return checker.length > 0
  })
}

module.exports = {
  User,
  KarnevalistInfo,
  setNewPassword,
  isCheckedIn
}
