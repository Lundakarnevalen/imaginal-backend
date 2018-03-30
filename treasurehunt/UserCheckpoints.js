'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Checkpoint = require('./checkpointModel').Checkpoint
const User = require('../users/users').User

const UserCheckpoints = dbc.define('UserCheckpoints', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})
/*
User.belongsToMany(UserCheckpoints, {
  through: {
    model: UserCheckpoints,
    unique: false
  },
  as: 'UserCheckpoint',
  constraints: false
})

Checkpoint.belongsToMany(UserCheckpoints, {
  through: {
    model: UserCheckpoints,
    unique: false
  },
  as: 'Checkpoint',
  constraints: false
})*/

module.exports = {
  UserCheckpoints
}
