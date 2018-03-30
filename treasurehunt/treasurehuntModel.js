const Sequelize = require('sequelize')
const dbc = require('../config/database')

const TreasureHunt = dbc.define('TreasureHunt', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.TEXT
})

module.exports = {
  TreasureHunt
}
