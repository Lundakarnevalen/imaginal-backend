const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Section = dbc.define('Sections', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING
})

module.exports = {
  Section
}
