'use strict';
const Sequelize = require('sequelize')
const dbc = require('../config/database')

const UserRole = dbc.define('UserRole', {
    UserId: Sequelize.INTEGER,
    RoleId: Sequelize.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.UserRole.hasOne(User, {as: UserId, foreignKey: 'UserId'})
        models.UserRole.hasOne(Role, {as: RoleId, foreignKey: 'RoleId'})
      }
    }
  })

module.exports = {
  UserRole
}