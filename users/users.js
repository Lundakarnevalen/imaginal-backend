const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')
const usersServce = require('./usersService')

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
  personalNumber: Sequelize.STRING,
  shirtSize: Sequelize.STRING
})

const KarnevalistInfo = dbc.define('KarnevalistInfo', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  language: Sequelize.STRING,
  driversLicense: Sequelize.STRING,
  foodPreference: Sequelize.TEXT,
  disability: Sequelize.TEXT,
  corps: Sequelize.STRING,
  startOfStudies: Sequelize.TEXT,
  pastInvolvement: Sequelize.TEXT,
  groupLeader: Sequelize.BOOLEAN,
  misc: Sequelize.TEXT,
  plenipotentiary: Sequelize.BOOLEAN,
  bff: Sequelize.TEXT,
  studentNation: Sequelize.STRING
})

// This adds UserId to KarnevalistInfo as foreign key
User.hasOne(KarnevalistInfo)

User.prototype.setNewPassword = function (user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err)
        return
      }
      user.password = hash
      user
        .save()
        .then(resolve)
        .catch(reject)
    })
  })
}

User.prototype.toJSON = async() => {
  return usersServce.userToJSON(this)
}

User.prototype.isCheckedIn = async() => {
  try {
    console.log(this)
    const checkIn = await this.getCheckin()
    return !!checkIn && checkIn.userId === user.id
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  User,
  KarnevalistInfo
}
