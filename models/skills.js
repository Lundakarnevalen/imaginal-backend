const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Skills = dbc.define('Skills', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  skill: Sequelize.TEXT
})

module.exports = {
  Skills
}
