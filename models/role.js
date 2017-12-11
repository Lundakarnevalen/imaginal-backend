'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const user = require('./users')

const Role = dbc.define('Role', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.STRING
})

Role.sync()

module.exports = {
  Role
}
