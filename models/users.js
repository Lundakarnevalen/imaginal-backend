const Sequelize = require('sequelize')
const dbc = require('../config/database')
const bcrypt = require('bcrypt')
const role = require('./role')
const User = dbc.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  name: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  address: Sequelize.STRING,
  postNumber: Sequelize.STRING,
  city: Sequelize.STRING,
  careOf: Sequelize.STRING,
  personalNumber: Sequelize.STRING
})
/*
const UserRoles = require('./userrole')

User.belongsToMany(role.Role, {
  through: {
    model: UserRoles
  },
  foreignKey: 'UserId'
})
User.sync()
role.Role.sync()

*/
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
