'use strict'
const dbc = require('../config/database')
const Sequelize = require('sequelize')

const SectionPriority = dbc.define('SectionPriority', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: Sequelize.INTEGER,
  section: Sequelize.STRING,
  prio: Sequelize.INTEGER
})

module.exports = {
  SectionPriority
}
