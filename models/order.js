const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Order = dbc.define('Order', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  orderDeliveryDate: Sequelize.DATE,
  checkedOut: Sequelize.BOOLEAN,
  checkedOutDate: Sequelize.DATE,
  return: Sequelize.BOOLEAN,
  returnDate: Sequelize.DATE,
})

module.exports = {
  Order
}
