const Sequelize = require('sequelize')
const dbc = require('../config/database')
const WarehouseUser = require('./warehouseUser')

const CostBearer = dbc.define('CostBearer', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  }
})

CostBearer.hasOne(WarehouseUser.WarehouseUser, {as: 'WarehouseUsers', foreignKey: 'costBearerId'})

module.exports = {
  CostBearer
}
