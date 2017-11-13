const Sequelize = require('sequelize')
const dbc = require('../config/database').dbc

const ForgotPassword = dbc.define('ForgotPassword', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userid: Sequelize.INTEGER,
  token: Sequelize.STRING
})

module.exports = {
  ForgotPassword
}
