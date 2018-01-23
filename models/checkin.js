const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../models/users').User

const Checkin = dbc.define('Checkin', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

User.hasMany(Checkin, { as: 'CheckinOwnership', foreignKey: 'checkerId' })
User.hasOne(Checkin, { as: 'Checkin', foreignKey: 'userId' })

module.exports = {
  Checkin
}
