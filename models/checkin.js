const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../models/users').User
const User2 = require('../models/users').User

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
    unique: false
  },
  as: 'user_id',
  foreignKey: 'user_id'
})

User2.belongsToMany(User2, {
  through: {
    model: Checkin,
    unique: false
  },
  as: 'checker_id',
  foreignKey: 'checker_id'
})
/*
User.hasOne(User, {
  through: {
    model: Checkin,
    unique: false
  },
  foreignKey: 'checker_id',
  constraints: false
})
*/
module.exports = {
  Checkin
}
