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
  personalNumber: Sequelize.STRING,
  shirtSize: Sequelize.STRING
})

/* toJSON is called when sending/stringifying the user (e.g. res.json(user))
 it removes sensitive data (password and access token) */
User.prototype.toJSON = function () {
  const usr = Object.assign({}, this.get())
  delete usr.password
  delete usr.token
  return usr
}

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
  audition: Sequelize.TEXT,
  corps: Sequelize.TEXT,
  startOfStudies: Sequelize.TEXT,
  pastInvolvement: Sequelize.TEXT,
  groupLeader: Sequelize.BOOLEAN,
  misc: Sequelize.TEXT,
  plenipotentiary: Sequelize.BOOLEAN,
  bff: Sequelize.TEXT,
  talent: Sequelize.TEXT,
  entertainmentCategory: Sequelize.TEXT,
  interests: Sequelize.TEXT
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
      user
        .save()
        .then(resolve)
        .catch(reject)
    })
  })
}

const isCheckedIn = async user => {
  const checkIn = await user.getCheckin()
  return !!checkIn && checkIn.userId === user.id
}

module.exports = {
  User,
  KarnevalistInfo,
  setNewPassword,
  isCheckedIn
}
