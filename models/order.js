const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Location = require('./storagelocation').StorageLocation


const Order = dbc.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  creationDate: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deliveryDate: Sequelize.DATE,
  returnDate: Sequelize.DATE,
  delivered: Sequelize.BOOLEAN,
  return: Sequelize.BOOLEAN
})

Order.belongsTo(Location, { as: 'StorageLocation', foreignKey: 'storageLocationID' })
//hasOne warehouseuserId

module.exports = {
  Order
}
