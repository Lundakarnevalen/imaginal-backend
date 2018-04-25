const Sequelize = require('sequelize')
const dbc = require('../config/database')

const BorrowedTool = dbc.define('BorrowedTools', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  checkedOut: Sequelize.BOOLEAN,
  returned: Sequelize.BOOLEAN
})

module.exports = {
  BorrowedTool
}
