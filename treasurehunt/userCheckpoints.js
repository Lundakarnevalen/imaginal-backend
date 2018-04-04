'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Checkpoint = require('./checkpointModel').Checkpoint
const User = require('../users/users').User
const TreasureHunt = require('./treasurehuntModel').TreasureHunt

const UserCheckpoints = dbc.define('UserCheckpoints', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

console.log(Checkpoint)

User.belongsToMany(Checkpoint, {
  through: {
    model: UserCheckpoints,
    unique: false
  },
  as: 'UserCheckpoint',
  constraints: false
})

/*
Checkpoint.belongsToMany(, {
  through: {
    model: UserCheckpoints,
    unique: false
  },
  as: 'CheckpointAsd',
  constraints: false
})*/

module.exports = {
  UserCheckpoints
}
