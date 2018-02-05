const Sequelize = require('sequelize')
const dbc = require('../config/database')

const BigPleasures = dbc.define('BigPleasures', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  audition: Sequelize.TEXT
})

module.exports = {
  BigPleasures
}
