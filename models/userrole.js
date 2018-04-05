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
  const isUser = hasRole(req.user, CUSTOMER)
  console.log(isUser)
  console.log('----------------------------------')
  return (isUser || hasWarehouseWorkerAccess(req))
}

const hasWarehouseWorkerAccess = function (req) {
  const isWorker = hasRole(req.user, WORKER)
  console.log(isWorker)
  console.log('----------------------------------')
  return (isWorker || hasWarehouseAdminAccess(req))
}

const hasWarehouseAdminAccess = function (req) {
  const isAdmin = hasRole(req.user, ADMIN)
  const isWarehouseManager = hasRole(req.user, MANAGER)
  console.log(isWarehouseManager)
  console.log(isAdmin)
  console.log('----------------------------------')
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
