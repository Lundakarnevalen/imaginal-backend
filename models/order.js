const Sequelize = require('sequelize')
const dbc = require('../config/database')
const StorageLocation = require('./storageLocation').StorageLocation
const WarehouseUser = require('./warehouseUser').WarehouseUser

const Order = dbc.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  orderDeliveryDate: Sequelize.DATE,
  returnDate: Sequelize.DATE,
  delivered: Sequelize.BOOLEAN,
  deliveredDate: Sequelize.DATE,
  return: Sequelize.BOOLEAN,
})

Order.hasOne(StorageLocation, { as: 'StorageLocation', foreignKey: 'storageLocationId' })
Order.hasOne(WarehouseUser, { as: 'WarehouseUser', foreignKey: 'warehouseUserId' })

module.exports = {
  Order
}
