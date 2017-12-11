'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Role = dbc.define('Role', {
  Description: Sequelize.STRING
}, {
  classMethods: {
    associate: function (models) {
        // associations can be defined here
    }
  }
})

module.exports = {
  Role
}
