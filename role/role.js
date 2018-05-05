'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Role = dbc.define('Role', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING
})

Role.prototype.toJSON = function () {
  const role = Object.assign({}, this.get())
  return role.description
}

const getRoleById = async (roleId) => {
  return Role.findOne({
    where: {id: roleId}
  })
}

module.exports = {
  Role,
  getRoleById
}
