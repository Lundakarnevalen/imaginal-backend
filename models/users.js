const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')
const role = require('./role')
const User = dbc.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  name: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  address: Sequelize.STRING,
  postNumber: Sequelize.STRING,
  city: Sequelize.STRING,
  careOf: Sequelize.STRING,
  personalNumber: Sequelize.STRING
})
/*
const UserRoles = require('./userrole')

User.belongsToMany(role.Role, {
  through: {
    model: UserRoles
  },
  foreignKey: 'UserId'
})
User.sync()
role.Role.sync()

*/
const setNewPassword = function (user, password) {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    user.password = hash
    user.save()
  })
}

const setRoles = function (user, sectionPriorities, done) {
  const lastDate = new Date(2020, 0, 0, 0, 0, 0, 0) // new Date(year, month, day, hours, minutes, seconds, milliseconds)
  if (Date.now() > lastDate.getTime()) {
    return done(null, false, 'Last date passed!')
  }

  if (uniqueSections(sectionPriorities)) {
    return done(null, false, 'Duplicate sections!')
  }

  SectionPriority.destroy({
    where: {
      user_id: user.id
    }
  }).then(() => sectionPriorities.forEach((currentValue, index) => SectionPriority.create({user_id: user.id, section: currentValue, prio: index})))
  return done(null, true, 'Priorities set')
}

const getRoles = function (email, done) {
  User.findAll({ 
    where: {
      email: email
    }
  }).then(user => done(null, makeSendablePrios(user)))
}

const uniqueSections = function (array) {
  return (new Set(array)).size !== array.length
}

const makeSendablePrios = function (user) {
  return user[0].section.split(',')
}

module.exports = {
  User,
  setNewPassword,
  setRoles,
  getRoles
}
