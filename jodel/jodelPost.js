const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const Posts = dbc.define('JodelPosts', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  text: Sequelize.TEXT
})

User.hasMany(Posts, {
  as: 'Jodels',
  foreignKey: 'userId'
})

Posts.belongsTo(User, {
  as: 'JodelUser',
  foreignKey: 'userId'
})

module.exports = {
  Posts
}
