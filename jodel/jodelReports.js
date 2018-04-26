const Sequelize = require('sequelize')
const dbc = require('../config/database')
const JodelPost = require('./jodelPost').Posts
const JodelComments = require('./jodelComments').Comments
const JodelReports = dbc.define('JodelReports', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

JodelPost.hasMany(JodelReports, {
  as: 'ReportedPost',
  foreignKey: 'postId'
})

JodelReports.belongsTo(JodelPost, {
  as: 'PostReport',
  foreignKey: 'postId'
})

JodelComments.hasMany(JodelReports, {
  as: 'ReportedPost',
  foreignKey: 'commentId'
})

JodelReports.belongsTo(JodelComments, {
  as: 'CommentReport',
  foreignKey: 'commentId'
})

module.exports = {
  JodelReports
}
