const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Location = require('./storagelocation').StorageLocation


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

Order.belongsTo(Location, { 
  as: 'StorageLocation', 
  foreignKey: 'storageLocationID',
  constraints: false
})
//hasOne warehouseuserId

module.exports = {
  Order
}
