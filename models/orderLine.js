const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Order = require('./order').Order
const Item = require('./item').Item


const OrderLine = dbc.define('OrderLine', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  quantityOrdered: Sequelize.INTEGER,
  quantityDelivered: Sequelize.INTEGER
})

Order.belongsToMany(Item, {
  through: {
    model: OrderLine,
    unique: false
  },
  foreignKey: 'orderID',
  constraints: false
})

Item.belongsToMany(Order, {
  through: {
    model: OrderLine,
    unique: false
  },
  foreignKey: 'itemID',
  constraints: false
})

module.exports = {
  OrderLine
}
