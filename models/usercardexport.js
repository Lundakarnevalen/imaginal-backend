'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')

const UserCardExport = dbc.define('UserCardExport', {
  user_id: {
    type: Sequelize.INTEGER
  },
})

module.exports = {
  UserCardExport,
}
