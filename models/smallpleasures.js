const Sequelize = require('sequelize')
const dbc = require('../config/database')

const SmallPleasures = dbc.define('SmallPleasures', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  audition: Sequelize.TEXT
})

module.exports = {
  SmallPleasures
}
