const Sequelize = require('sequelize')
const dbc = require('../config/database')

const ForgotPassword = dbc.define('ForgotPassword', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: Sequelize.STRING,
  token: Sequelize.STRING
})

module.exports = {
  ForgotPassword
}
