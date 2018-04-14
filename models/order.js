const Sequelize = require('sequelize')
const dbc = require('../config/database')
const StorageLocation = require('./storagelocation').StorageLocation
const 

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

Order.hasOne(StorageLocation, { as: 'StorageLocation', foreignKey: 'storageLocationID' })
Order.hasOne(WarehouseUser, { as: 'WarehouseUser', foreignKey: 'warehouseUserID' })

module.exports = {
  Order
}
