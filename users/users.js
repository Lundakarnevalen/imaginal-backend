const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')
const usersServce = require('./usersService')
const Checkin = require('../checkin/checkin').Checkin
const Skills = require('../models/skills').Skills
const BigPleasures = require('../models/bigpleasures').BigPleasures
const SmallPleasures = require('../models/smallpleasures').SmallPleasures
const Interests = require('../models/interests').Interests
const WarehouseUser = require('../models/warehouseUser').WarehouseUser

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
User.hasMany(Checkin, { as: 'CheckinOwnership', foreignKey: 'checkerId' })
User.hasOne(Checkin, { as: 'Checkin', foreignKey: 'userId' })

User.hasMany(SmallPleasures, {as: 'UserSmallAudition', foreignKey: 'userId'})
User.hasMany(Skills, {as: 'UserSkill', foreignKey: 'userId'})
User.hasMany(Interests, {as: 'UserInterest', foreignKey: 'userId'})
User.hasMany(BigPleasures, {as: 'UserBigAudition', foreignKey: 'userId'})

User.hasOne(WarehouseUser, {as: 'WarehouseUser', foreignKey: 'userId'})

User.prototype.setNewPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err)
        return
      }
      this.password = hash
      this
        .save()
        .then(resolve)
        .catch(reject)
    })
  })
}

User.prototype.toJSON = function () {
  return usersServce.userToJSON(this)
}

const getAllUsersAndCount = function (inputOffset, inputLimit) {
  const offset = parseInt(inputOffset) || 0
  const limit = inputLimit || 25
  return User.findAndCountAll({
    order: ['id'],
    offset: offset,
    limit: limit
  })
}

/** Finds a user where identity = email or identity = personalNumber. Returns a promise */
const getUserByIdentification = function (identity) {
  return User.findOne({
    where: {
      $or: [{personalNumber: identity}, {email: identity}]
    }
  })
}

module.exports = {
  User,
  KarnevalistInfo,
  getAllUsersAndCount,
  getUserByIdentification
}
