const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../models/users').User

const Checkin = dbc.define('Checkin', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  checker_id: {
    type: Sequelize.INTEGER
  }
})

User.belongsToMany(User, {
  through: {
    model: Checkin,
    unique: true
  },
  as: 'user',
  foreignKey: 'checker_id'
})

/** TODO: We want this (or the otherone, not sure) to be User.hasOne */
User.belongsToMany(User, {
  through: {
    model: Checkin,
    unique: false
  },
  as: 'checker',
  foreignKey: 'user_id'
})

module.exports = {
  Checkin
}
