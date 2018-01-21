const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Section = dbc.define('Sections', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  imageUrl: Sequelize.STRING,
  nameSv: Sequelize.STRING,
  nameEn: Sequelize.STRING,
  textSv: Sequelize.STRING,
  textEn: Sequelize.STRING
})

module.exports = {
  Section
}
