const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const service = require('./service')
const Posts = dbc.define('JodelPosts', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  color: Sequelize.STRING,
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

const getColor = function () {
  const colors = ['#ffffff', '#000000', '#9a9a9a']
  const nbr = Math.floor(Math.random() * Math.floor(colors.length))
  return colors[nbr]
}

Posts.prototype.toJSON = async (post) => {
  let voted = false
  const votes = await post.getJodelVote().map(x => {
    if (x.userId === post.userId) { voted = true }
    return x.value
  })
  let result
  if (votes.length > 0) {
    result = votes.reduce((acc, curval) => acc + curval)
  } else { result = 0 }
  const comments = await post.getJodelComments()
  const user = await post.getJodelUser()
  const isFav = await service.isFavourite(post, user)
  const posts = {
    id: post.id,
    votes: result,
    comments: comments.length,
    text: post.text,
    createdAt: post.createdAt,
    voted,
    color: post.color,
    isFavourite: isFav
  }
  return posts
}

const getAllPostsAndCount = function (inputOffset, inputLimit) {
  const offset = parseInt(inputOffset) || 0
  const limit = inputLimit || 25
  const date = Date.now() - 1000 * 60 * 60 * 24 * 5
  return Posts.findAndCountAll({
    where: {
      createdAt: {gte: date} // Move this to the part where you get a users posts, votes etc
    },
    order: ['id'],
    offset: offset,
    limit: limit
  })
}

module.exports = {
  Posts,
  getAllPostsAndCount,
  getColor
}
