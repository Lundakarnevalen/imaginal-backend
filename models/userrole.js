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
    where: { description: role }
  }).then(role => {
    return user.hasRole(role)
  })
}

/* Put the async stuff in a try/catch block */
const hasWarehouseCustomerAccess = async (req) => {
  const isUser = await hasRole(req.user, CUSTOMER)
  const hasWarehouseAccess = await hasWarehouseWorkerAccess(req)
  return (isUser || hasWarehouseAccess)
}

/* Put the async stuff in a try/catch block */
const hasWarehouseWorkerAccess = async (req) => {
  const isWorker = await hasRole(req.user, WORKER)
  const isWarehouseAdmin = await hasWarehouseAdminAccess(req)
  return (isWorker || isWarehouseAdmin)
}

/* Put the async stuff in a try/catch block */
const hasWarehouseAdminAccess = async (req) => {
  const isAdmin = await hasRole(req.user, ADMIN)
  const isWarehouseManager = await hasRole(req.user, MANAGER)
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
