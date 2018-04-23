const Sequelize = require('sequelize')
const dbc = require('../config/database')

const WarehouseUser = dbc.define('WarehouseUser', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

module.exports = {
  WarehouseUser
}
