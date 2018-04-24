const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Tool = dbc.define('Tools', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  imgUrl: Sequelize.TEXT,
  quantity: Sequelize.INTEGER,
})

//Tool.hasMany(BorrowedTool, {as: 'BorrowedTools', foreignKey: 'toolId'})

module.exports = {
  Tool
}
