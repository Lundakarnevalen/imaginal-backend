const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const JodelPost = require('./jodelPost').Posts
const JodelFavourite = dbc.define('JodelFavourite', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
})

JodelPost.belongsToMany(User, {
  through: {
    model: JodelFavourite,
    unique: false
  },
  as: 'FavouriteUser',
  foreignKey: 'postId'
})

User.belongsToMany(JodelPost, {
  through: {
    model: JodelFavourite,
    unique: false
  },
  as: 'UserFavourites',
  foreignKey: 'userId'
})

module.exports = {
  JodelFavourite
}
