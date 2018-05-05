const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Section = dbc.define('Sections', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  imageUrl: Sequelize.TEXT,
  nameSv: Sequelize.STRING,
  nameEn: Sequelize.STRING,
  textSv: Sequelize.TEXT,
  textEn: Sequelize.TEXT,
  longTextSv: Sequelize.TEXT,
  longTextEn: Sequelize.TEXT
})

module.exports = {
  Section
}
