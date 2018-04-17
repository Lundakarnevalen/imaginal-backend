const JodelPost = require('./jodelPost').Posts
const jodelposts = require('./jodelPost')
const Sequelize = require('sequelize')

JodelPost.sync()
const JodelComments = require('./jodelComments').Comments
JodelComments.sync()
const JodelVote = require('./jodelVote').Vote
JodelVote.sync()

const User = require('../users/users').User

const MAX_LENGTH = 200
const MIN_LENGTH = 1

const newPost = async (req, res) => {
  const message = req.body.message
  if (!message || message.length > MAX_LENGTH || message.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: 'Message too long or too short'
    })
  }

  const user = await User.findOne({
    where: {id: 1}
  })
  const newjp = await JodelPost.create({
    text: message
  })
  await user.addJodels([newjp])
  console.log('Jodel!')
  console.log(user.firstName)
  let jodel = await JodelPost.findOne({where: {id: 1}})
  await console.log('-----------Hämtar ut user---------')
  jodel = await jodel.getJodelUser()
  console.log(jodel.firstName)
  res.json({
    success: true,
    message: 'Jodel posted',
    jId: newjp.id
  })
}

const addJodelComment = async (req, res) => {
  'use strict'
  const message = req.body.message
  if (!message || message.length > MAX_LENGTH || message.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: 'Message too long or too short'
    })
  }
  const user = await User.findOne({
    where: {id: 1}
  })

  const jp = await JodelPost.findOne({
    where: {id: req.body.id}
  })
  if (!jp) {
    return res.status(400).json({
      success: false,
      message: 'Failed to find post'
    })
  }
  const newjc = await JodelComments.create({
    text: message
  })
  await user.addJodelComments([newjc])
  await jp.addJodelComments([newjc])
  res.send()
}

const hasVoted = async (post, user) => {
  'use strict'
  const votes = await post.getJodelVote()
  for (let i = 0, len = votes.length; i < len; i++) {
    if (votes[i].userId === user.id) {
      console.log('--------')
      return true
    }
  }

  return false
}
const addJodelVote = async (req, res) => {
  'use strict'
  const postid = req.body.jodelId
  let value = req.body.vote

  if (value !== 1) {
    value = -1
  }
  const user = await User.findOne({
    where: {id: 1}
  })

  const jp = await JodelPost.findOne({
    where: {id: postid}
  })

  if (!jp) {
    return res.status(400).json({
      success: false,
      message: 'Failed to find post'
    })
  }

  const voted = await hasVoted(jp, user)
  console.log(voted)
  if (voted) {
    return res.status(401).json({
      success: false,
      message: 'User has already voted'
    })
  }
  const newjv = await JodelVote.create({
    value: value
  })

  user.addJodelVotes([newjv])
  jp.addJodelVote([newjv])

  res.send()
}

const getJodelPost = async (req, res) => {
  'use strict'
  const postId = req.params.id
  if (!postId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid postId'
    })
  }
  const jp = await JodelPost.findOne({
    where: {id: postId}
  })
  if (!jp) {
    return res.status(500).json({
      success: false,
      message: 'Failed to find post'
    })
  }
  const post = await jp.toJSON(jp)
  const opId = jp.userId
  const comments = await jp.getJodelComments().map(x => {
    const isOp = x.userId === opId
    const info = {
      text: x.text,
      isOp
    }
    return info
  })
  return res.json({
    success: true,
    post,
    comments
  })
}

const getAllPosts = async (req, res) => {
  'use strict'
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const allPosts = await jodelposts.getAllPostsAndCount(offset, limit)
  const allPostsJSON = await Promise.all(allPosts.rows.map(async (post) => {
    return await post.toJSON(post)
  }))
  console.log(allPostsJSON)
  res.json({
    success: true,
    posts: allPostsJSON,
    count: allPosts.count
  })
}

const getAllPostsByVotes = async (req, res) => {
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
      })
    }
  /*const as = await JodelVote.findAll({
    attributes: [[
      Sequelize.fn(`SUM`, Sequelize.col('value')), 'votes'
    ]],
    group: ['postId'],
  }*/
  const as = await JodelVote.findAll({
    order: [Sequelize.fn(`SUM`, Sequelize.col('value'))],
    group: ['postId']
  })
  console.log(as)
  res.json({
    success: true,
  })

}

module.exports = {
  newPost,
  addJodelComment,
  addJodelVote,
  getJodelPost,
  getAllPosts,
  getAllPostsByVotes
}
