'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Tool = require('./tools').Tool
// const WarehouseUser = require('./warehouseUser').WarehouseUser

const BorrowedTool = dbc.define('BorrowedTools', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  startDate: Sequelize.DATE,
  returnDate: Sequelize.DATE,
  checkedOut: Sequelize.BOOLEAN,
  returned: Sequelize.BOOLEAN,
  warehouseUserId: Sequelize.INTEGER,
  toolId: sequelize.INTEGER
})

module.exports = {
  BorrowedTool
}

BorrowedTool.BelongsToMany(Tool, {
  through: {
    model: BorrowedTool,
    unique: false
  },
  foreignKey: 'itemId',
  constraints: false
})
/*
WarehouseUser.belongsToMany(

) */
