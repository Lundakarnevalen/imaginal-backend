'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const Role = require('../role/role').Role

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

const hasWarehouseCustomerAccess = function (req) {
  const isUser = UserRole.hasRole(req.user, UserRole.CUSTOMER)
  return (isUser || hasWarehouseWorkerAccess(req) || hasWarehouseAdminAccess(req))
}

const hasWarehouseWorkerAccess = function (req) {
  const isWorker = UserRole.hasRole(req.user, UserRole.WORKER)
  return (isWorker || hasWarehouseAdminAccess(req))
}

const hasWarehouseAdminAccess = function (req) {
  const isAdmin = UserRole.hasRole(req.user, UserRole.ADMIN)
  const isWarehouseManager = UserRole.hasRole(req.user, UserRole.MANAGER)
  return (isAdmin || isWarehouseManager)
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
  MANAGER,
  hasWarehouseCustomerAccess,
  hasWarehouseWorkerAccess,
  hasWarehouseAdminAccess
}
