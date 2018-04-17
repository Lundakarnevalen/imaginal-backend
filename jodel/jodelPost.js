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

Posts.prototype.toJSON = async (post) => {

  const votes = await post.getJodelVote().map(x => x.value)
  let result
  if (votes.length > 0) {
    result = votes.reduce((acc, curval) => acc + curval)
  } else { result = 0 }
  const comments = await post.getJodelComments()
  const posts = {
    id: post.id,
    votes: result,
    comments: comments.length,
    text: post.text
  }
  return posts
}

const getPostByVotes = function (inputOffset, inputLimit) {
  const offset = parseInt(inputOffset) || 0
  const limit = inputLimit || 25
  const date = Date.now() - 1000*60*60*24*5
  console.log(date)
  return Posts.findAndCountAll({
    include: [{
      model: Votes,
      as: votes
    }],
    where: {
      createdAt: {gte: date} //Move this to the part where you get a users posts, votes etc
    },
    order: ['id'],
    offset: offset,
    limit: limit
  })
}

const getAllPostsAndCount = function (inputOffset, inputLimit) {
  const offset = parseInt(inputOffset) || 0
  const limit = inputLimit || 25
  const date = Date.now() - 1000*60*60*24*5
  console.log(date)
  return Posts.findAndCountAll({
    where: {
      createdAt: {gte: date} //Move this to the part where you get a users posts, votes etc
    },
    order: ['id'],
    offset: offset,
    limit: limit
  })
}

module.exports = {
  Posts,
  getAllPostsAndCount,
  getPostByVotes
}
