const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Interests = dbc.define('Interests', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  interest: Sequelize.TEXT
})

module.exports = {
  Interests
}
