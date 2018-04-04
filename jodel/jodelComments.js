const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const JodelPost = require('./jodelPost').Posts
const Comments = dbc.define('JodelComments', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  text: Sequelize.TEXT
})

User.hasMany(Comments, {
  as: 'JodelComments',
  foreignKey: 'userId'
})

Comments.belongsTo(User, {
  as: 'CommentUser',
  foreignKey: 'userId'
})

JodelPost.hasMany(Comments, {
  as: 'JodelComments',
  foreignKey: 'postId'
})

Comments.belongsTo(JodelPost, {
  as: 'Comments',
  foreignKey: 'postId'
})

module.exports = {
  Comments
}
