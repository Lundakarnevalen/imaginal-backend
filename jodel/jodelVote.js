const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const JodelPost = require('./jodelPost').Posts
const Vote = dbc.define('JodelVotes', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  value: Sequelize.INTEGER
})

User.hasMany(Vote, {
  as: 'JodelVotes',
  foreignKey: 'userId'
})

Vote.belongsTo(User, {
  as: 'VoteUser',
  foreignKey: 'userId'
})

JodelPost.hasMany(Vote, {
  as: 'JodelVotes',
  foreignKey: 'postId'
})

Vote.belongsTo(JodelPost, {
  as: 'Votes',
  foreignKey: 'postId'
})

module.exports = {
  Vote
}
