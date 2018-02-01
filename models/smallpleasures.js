const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User

const SmallPleasures = dbc.define('SmallPleasures', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  audition: Sequelize.TEXT
})

// This adds UserId to KarnevalistInfo as foreign key

User.hasMany(SmallPleasures, {as: 'UserSmallAudition', foreignKey: 'userId'})

module.exports = {
  SmallPleasures
}
