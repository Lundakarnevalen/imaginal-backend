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

const getKarnevalistInfo = async (user) => {
  const karnevalistInfo = await KarnevalistInfo.findOne({
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
  return karnevalistInfo
}

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

User.prototype.toJSON = async () => {
  try {
    const user = Object.assign({}, this.get())
    delete user.password
    delete user.token
    const checkedIn = await user.isCheckedIn()
    const allRoles = await user.getRoles()
    const roles = await allRoles.map(role => role.toJSON()).map(role => {
      return role
    })

    const karneInfo = await getKarnevalistInfo(user)

    const userinfo = {
      checkedIn,
      ...user.toJSON(),
      ...karneInfo.dataValues,
      roles: [...roles]
    }

    return userinfo
  } catch (err) {
    console.err(err)
    return null
  }
}

User.prototype.isCheckedIn = async () => {
  try {
    const user = Object.assign({}, this.get())
    const checkIn = await user.getCheckin()
    return !!checkIn && checkIn.userId === user.id
  } catch (err) {
    console.err(err)
    return null
  }
}

module.exports = {
  User
}
