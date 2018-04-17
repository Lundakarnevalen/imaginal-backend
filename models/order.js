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

Order.hasOne(StorageLocation, { as: 'StorageLocation', foreignKey: 'storageLocationID' })
Order.hasOne(WarehouseUser, { as: 'WarehouseUser', foreignKey: 'warehouseUserID' })

module.exports = {
  Order
}
