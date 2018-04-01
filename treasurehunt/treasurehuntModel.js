const Sequelize = require('sequelize')
const dbc = require('../config/database')

const TreasureHunt = dbc.define('TreasureHunt', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.TEXT,
  open: Sequelize.INTEGER,
  closes: Sequelize.INTEGER
})

module.exports = {
  TreasureHunt
}
