'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const Item = require('./item').Item
const Tag = require('./tag').Tag

const ItemTag = dbc.define('ItemTag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemId: {
    type: Sequelize.INTEGER
  },
  tagId: {
    type: Sequelize.INTEGER
  }
})

Item.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: false
  },
  foreignKey: 'itemId',
  constraints: false
})

Tag.belongsToMany(Item, {
  through: {
    model: ItemTag,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
})

const hasItem = function (tag) {
  return Tag.findAll({
    where: {tag: name}
  })
}

const hasTag = function (item)  {
  return Item.findAll({
    where: {item: itemName}
  })
}


module.exports = {
  ItemTag,
}
