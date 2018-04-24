'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Tool = require('./tools').Tool
const Tag = require('./tag').Tag

const ToolTag = dbc.define('ToolTag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  toolId: {
    type: Sequelize.INTEGER
  },
  tagId: {
    type: Sequelize.INTEGER
  }
})

Tool.belongsToMany(Tag, {
  through: {
    model: ToolTag,
    unique: false
  },
  foreignKey: 'toolId',
  constraints: false
})

Tag.belongsToMany(Tool, {
  through: {
    model: ToolTag,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
})

module.exports = {
  ToolTag
}
