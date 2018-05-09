'use strict'

const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Tool = require('./tools').Tool
const WarehouseUser = require('./warehouseUser').WarehouseUser

const BorrowedTool = dbc.define('BorrowedTools', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  checkedOutDate: Sequelize.DATE,
  returnedDate: Sequelize.DATE,
  warehouseUserId: Sequelize.INTEGER,
  toolId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
})

BorrowedTool.BelongsToMany(Tool, {
  through: {
    model: BorrowedTool,
    unique: false,
  },
  foreignKey: 'itemId'
})

WarehouseUser.belongsToMany(WarehouseUser, {
  through: {
    model: BorrowedTool,
    unique: false,
  },
  foreignKey: 'WarehouseUserId'
})

module.exports = {
  BorrowedTool
}