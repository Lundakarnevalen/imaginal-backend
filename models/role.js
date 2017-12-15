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

module.exports = {
  Role
}
