const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Item = dbc.define('Item', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    itemName: Sequelize.STRING,
    imageUrl: Sequelize.TEXT,
    unit: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    pricePerUnit: Sequelize.FLOAT, /** OR other nbr type? */
    storageLocation: Sequelize.STRING, /** OR Storage Location ID? */
    description: Sequelize.STRING,
    creator: Sequelize.INTEGER, /** Or by email/name? */
    weight: Sequelize.STRING,
    measurements: Sequelize.STRING,
    category: Sequelize.STRING
})

module.exports = {
    Item
}