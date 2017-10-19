const Sequelize = require('sequelize')
const dbc = require('../config/database').dbc

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

let findUser = function(email, callback) {
  console.log(email)
  User.findOne({
    where: {email: email}
  })
    .then(function (user) {   // We could just return a promise instead
      callback(null, user)
    })
}

module.exports = {
  User,
  findUser
}
