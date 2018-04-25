const Sequelize = require('sequelize')
const dbc = require('../config/database')

const WarehouseUser = dbc.define('WarehouseUser', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

// WarehouseUser.hasOne(BorrowedTool, {as: 'BorrowedTool', foreignKey: 'warehouseUserId'})

module.exports = {
  WarehouseUser
}
