const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Order = require('./order').Order

const WarehouseUser = dbc.define('WarehouseUser', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

WarehouseUser.hasOne(Order, { as: 'Order', foreignKey: 'warehouseUserId' })

module.exports = {
  WarehouseUser
}
