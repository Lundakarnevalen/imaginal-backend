const Sequelize = require('sequelize')
const dbc = require('../config/database')
<<<<<<< HEAD
const Location = require('./storageLocation').StorageLocation
=======
const Location = require('./storagelocation').StorageLocation
>>>>>>> e6961fd11737eaca89fa1f8544a41bbaaeafe7ce
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

Location.belongsToMany(Item, {
  through: {
    model: StorageContent,
    unique: false
  },
  foreignKey: 'locationID',
  constrains: false
})

Item.belongsToMany(Location, {
  through: {
    model: StorageContent,
    unique: false
  },
  foreignKey: 'itemID',
  constrains: false

})

module.exports = {
  StorageContent
}
