const Sequelize = require('sequelize')
const dbc = require('../config/database')
const StorageLocation = require('./storageLocation').StorageLocation
const Item = require('./item').Item

const StorageContent = dbc.define('StorageContent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  locationID: {
    type: Sequelize.INTEGER
  },
  itemID: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

StorageLocation.belongsToMany(Item, {
  through: {
    model: StorageContent,
    unique: false
  },
  foreignKey: 'storageLocationId',
  constrains: false
})

Item.belongsToMany(StorageLocation, {
  through: {
    model: StorageContent,
    unique: false
  },
  foreignKey: 'itemId',
  constrains: false

})

module.exports = {
  StorageContent
}
