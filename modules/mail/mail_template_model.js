const Sequelize = require('sequelize')
const dbc = require('../../config/database')

const MailTemplate = dbc.define('MailTemplate', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
  subject: {
    type: Sequelize.STRING,
  },
  language: {
    type: Sequelize.ENUM('en','sv'),
  },
})

module.exports = {
  MailTemplate
}
