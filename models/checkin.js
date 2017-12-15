const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Checkin = dbc.define('Checkin', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: Sequelize.INTEGER
})

module.exports = {
  Checkin
}
