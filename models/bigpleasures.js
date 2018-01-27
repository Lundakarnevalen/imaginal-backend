const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('./users').User

const BigPleasures = dbc.define('BigPleasures', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  audition: Sequelize.STRING
})

// This adds UserId to KarnevalistInfo as foreign key

User.hasMany(BigPleasures, {as: 'UserBigAudition', foreignKey: 'userId'})

module.exports = {
  BigPleasures
}
