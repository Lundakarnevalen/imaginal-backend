const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Tag = dbc.define('Tag', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,

})

module.exports = {
  Tag
}
