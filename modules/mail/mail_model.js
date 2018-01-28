const Sequelize = require('sequelize')
const dbc = require('../../config/database')

const Mail = dbc.define('Mail', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  unverified: {
    type: Sequelize.BOOLEAN,
  },
  verifiedBad: {
    type: Sequelize.BOOLEAN,
  },
  verifiedGood: {
    type: Sequelize.BOOLEAN,
  },
})

module.exports = {
  Mail
}
