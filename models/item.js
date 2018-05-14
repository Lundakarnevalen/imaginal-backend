const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Item = dbc.define('Item', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  imageUrl: Sequelize.TEXT,
  unit: Sequelize.STRING,
  purchasePrice: Sequelize.DOUBLE,
  salesPrice: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  articleNumber: Sequelize.INTEGER,
  supplier: Sequelize.STRING,
  note: Sequelize.STRING,
  warningAmount: Sequelize.INTEGER,
  vat: Sequelize.DOUBLE,
  costNr: Sequelize.STRING
})

const findUniqueItem = (articleNumber, supplier) => Item.findAll({
  where: { articleNumber: articleNumber, supplier: supplier }
})

module.exports = {
  Item,
  findUniqueItem
}
