const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')

const User = dbc.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING
})

const setNewPassword = function (user, password) {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    user.password = hash
    user.save()
  })
}

module.exports = {
  User,
  setNewPassword
}
