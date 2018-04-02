const Sequelize = require('sequelize')
const dbc = require('../config/database')

const StorageLocation = dbc.define('StorageLocation', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  storageName: Sequelize.STRING,
  description: Sequelize.TEXT
})

module.exports = {
  StorageLocation
}
