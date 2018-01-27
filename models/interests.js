const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('./users').User

const Interests = dbc.define('Interests', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  interest: Sequelize.STRING
})

// This adds UserId to KarnevalistInfo as foreign key

User.hasMany(Interests, {as: 'UserInterest', foreignKey: 'userId'})

module.exports = {
  Interests
}
