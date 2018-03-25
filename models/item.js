const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Item = dbc.define('Item', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  itemName: Sequelize.STRING,
  imageUrl: Sequelize.TEXT,
  unit: Sequelize.STRING,
  purchasePrice: Sequelize.DOUBLE,
  salesPrice: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  articleNumber: Sequelize.INTEGER,
  supplier: Sequelize.STRING
})

module.exports = {
  Item
}
