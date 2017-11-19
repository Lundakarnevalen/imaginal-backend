const Sequelize = require('sequelize')
const dbc = require('../config/database').dbc
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

let findUser = function (email, callback) {
  User.findOne({
    where: {email: email}
  })
    .then(function (user) {   // We could just return a promise instead
      callback(null, user)
    })
}

let setNewPassword = function (user, password) {
  // 10 rounds used for salt, needs to be tested and optimized
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    user.password = hash
    dbc.sync()
    user.save().then(() => {
    })
  })
}

module.exports = {
  User,
  findUser,
  setNewPassword
}
