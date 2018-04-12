const Sequelize = require('sequelize')
const dbc = require('../config/database')
const StorageLocation = require('./storagelocation').StorageLocation


const Order = dbc.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  deliveryDate: Sequelize.DATE,
  returnDate: Sequelize.DATE,
  delivered: Sequelize.BOOLEAN,
  return: Sequelize.BOOLEAN,
})

Order.hasOne(StorageLocation, { as: 'StorageLocation', foreignKey: 'storageLocationId' })
Order.hasOne(, { 
  as: 'StorageLocation', 
  foreignKey: 'storageLocationId',
  constraints: false
})
//hasOne warehouseuserId

module.exports = {
  Order
}
