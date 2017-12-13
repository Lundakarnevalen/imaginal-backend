'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('./users').User
const Role = require('./role').Role

const UserRole = dbc.define('UserRole', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: Sequelize.INTEGER
  },
  roleid: {
    type: Sequelize.INTEGER
  }
})
/*  Creates a role and adds a user to that
Role.create({
  description: 'Administrator'
}).then(newrole => {
  newrole.save()
  User.findOne({
    where: {id: 20}
  }).then(user => {
    user.setRoles([newrole])
  })
}).save

*/

User.belongsToMany(Role, {
  through: {
    model: UserRole,
    unique: false
  },
  foreignKey: 'userid',
  constraints: false
})

Role.belongsToMany(User, {
  through: {
    model: UserRole,
    unique: false
  },
  foreignKey: 'roleid',
  constraints: false
})

UserRole.sync()
Role.sync()
User.sync()

const getUsers = function (roleId, callback) {
  UserRole.findAll({
    where: {
      RoleId: roleId
    }
  }).then(users => done(null, makeSendablePrios(userRoles)))
}

const makeSendablePrios = function (userRoles) {
  return userRoles[0].section.split(',')
}

module.exports = {
  UserRole,
  getUsers
}
