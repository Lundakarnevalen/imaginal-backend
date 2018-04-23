const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Order = require('./order').Order

const StorageLocation = dbc.define('StorageLocation', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  storageName: Sequelize.STRING,
  description: Sequelize.TEXT
})

StorageLocation.hasOne(Order, { as: 'Order', foreignKey: 'storageLocationId' })

module.exports = {
  StorageLocation
}
