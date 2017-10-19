const Sequelize = require('sequelize')

const database = 'karneval'
const databaseURL = 'localhost'

const dbc = new Sequelize(database, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
  host: databaseURL,
  dialect: 'mysql'
})

module.exports = {
  dbc
}
