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

const addRole = function () {

}

const addUser = function () {

}

const uniqueSections = function (array) {
  return (new Set(array)).size !== array.length
}

const makeSendablePrios = function (userRoles) {
  return userRoles[0].section.split(',')
}

module.exports = {
  Role,
  addRole,
  addUser
}
