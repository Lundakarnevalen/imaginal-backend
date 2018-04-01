'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
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

const hasRole = function (user, role) { // (user, role) returns a boolean-promise
  return Role.findOne({
    where: {description: role}
  }).then(role => {
    return user.hasRole(role)
  })
}

const hasWarehouseRole = function (user)  {
  const warehouseAccesses = [CUSTOMER, WORKER, MANAGER]
  warehouseAccesses.map(warehouseAccess => {
    if (user.hasRole(warehouseAccess))  {
      return true
    }
  })
  return false
}

const ADMIN = 'administrator'
const CUSTOMER = 'warehouse customer'
const WORKER = 'warehouse worker'
const MANAGER = 'warehouse manager'

module.exports = {
  UserRole,
  hasRole,
  ADMIN,
  CUSTOMER,
  WORKER,
  MANAGER
}
