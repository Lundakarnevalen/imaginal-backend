const Sequelize = require('sequelize')
const user = process.env.MYSQL_USER || 'root'
const pass = process.env.MYSQL_PASS || ''
const database = 'karneval'
const databaseURL = process.env.MYSQL_HOST || 'localhost'

module.exports = new Sequelize(database, user, pass, {
  host: databaseURL,
  dialect: 'mysql'
})
