const TIME_LIMIT_FOR_TRENDING = Date.now() - 1000 * 60 * 60 * 24 * 2 // 2 days old or newer
const JodelPost = require('./jodelPost').Posts
const jodelposts = require('./jodelPost')
const Sequelize = require('sequelize')
const JodelFav = require('./jodelFavourites').JodelFavourite
JodelFav.sync()
JodelPost.sync()
const JodelComments = require('./jodelComments').Comments
JodelComments.sync()
const JodelVote = require('./jodelVote').Vote
JodelVote.sync()
const JodelReport = require('./jodelReports').JodelReports
JodelReport.sync()
require('./jodelVote') // Required for ORM stuff
const service = require('./service')
const userRole = require('../models/userrole')

const MAX_LENGTH = 240
const MIN_LENGTH = 1
const COMMENT_MAX_LENGTH = 140

const deleteReport = async (req, res) => {
  const id = req.body.id
  const asd = await JodelReport.findOne({
    where: {id: id}
  })
  if (!asd) {
    return res.status(400).json({
      success: false,
      message: 'Unable to find report'
    })
  }
  await asd.destroy()
  await JodelReport.destroy({where: {postId: id}})
  res.send()
}

const deleteComment = async (req, res) => {
  const id = req.body.commentId
  const user = req.user
  const hasAccess = await userRole.hasRole(user, userRole.ADMIN)
  if (!hasAccess) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  const asd = await JodelComments.findOne({
    where: {id: id}
  })
  if (!asd) { res.status(400).json({success: false, message: 'invalid id'}) }
  await JodelReport.destroy({where: {commentId: id}})
  await asd.destroy()
  res.json({sucess: true})
}

const deletePost = async (req, res) => {
  const id = req.body.jodelId
  const user = req.user
  const post = await JodelPost.findOne({
    where: {id: id}
  })
  if (!post) {
    return res.status(400).json({
      success: false,
      message: 'invalid id'})
  }
  const userpost = await post.getJodelUser()
  const hasAccess = await userRole.hasRole(user, userRole.ADMIN)
  if (!hasAccess && user.id !== userpost.id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }

  await JodelVote.destroy({where: {postId: id}})
  await JodelReport.destroy({where: {postId: id}})
  await JodelComments.destroy({where: {postId: id}})
  await post.destroy()
  res.json({sucess: true})
}

const deleteFavourite = async (req, res) => {
  const id = parseInt(req.body.jodelId) || 0
  if (id < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid post id'
    })
  }
  await JodelFav.destroy({
    where: {
      userId: req.user.id,
      postId: id
    }
  })
  await JodelComments.destroy({where: {postId: id}})
  res.json({sucess: true})
}

const getAllReports = async (req, res) => {
  'use strict'
  const hasAccess = await userRole.hasRole(req.user, userRole.ADMIN)
  if (!hasAccess) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const allReports = await JodelReport.findAll({
    order: ['id'],
    group: ['id'],
    limit: limit,
    offset: offset
  })

  /** ugly code */
  const harrh = await Promise.all(allReports.map(async(x) => {
    let asd
    if (x.postId !== null) {
      asd = await x.getPostReport()
      asd = await asd.toJSON(asd)
    } else {
      asd = await x.getCommentReport()
      asd = await asd.toJSON(asd)
    }
    return asd
  }))

  res.json({
    success: true,
    reports: harrh
  })
}

const reportPost = async (req, res) => {
  const id = req.body.jodelId
  await JodelReport.create({
    postId: id
  })
  res.send({success: true})
}

const reportComment = async (req, res) => {
  await JodelReport.create({
    commentId: req.body.commentId
  })
  res.send({success: true})
}

const newPost = async (req, res) => {
  const message = req.body.message
  if (!message || message.length > MAX_LENGTH || message.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: 'Message too long or too short'
    })
  }

  const color = jodelposts.getColor()
  const user = req.user
  const newjp = await JodelPost.create({
    text: message,
    color: color
  })
  await user.addJodels([newjp])
/*  JodelVote.create({ //asdasdasd
    value: 0,
    userId: 1,
    postId: newjp.id
  }) */
  res.json({
    success: true,
    message: 'Jodel posted',
    jodelId: newjp.id
  })
}

const addJodelComment = async (req, res) => {
  'use strict'
  const message = req.body.message
  const id = req.body.jodelId
  if (!message || message.length > COMMENT_MAX_LENGTH || message.length < MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: 'Message too long or too short'
    })
  }
  const user = req.user

  const jp = await JodelPost.findOne({
    where: {id: id}
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
  const votes = await post.getJodelVotes()
  for (let i = 0, len = votes.length; i < len; i++) {
    if (votes[i].userId === user.id) {
      return true
    }
  }

  return false
}

const addJodelVote = async (req, res) => {
  'use strict'
  const postid = req.body.jodelId
  let value = req.body.value

  if (value !== 1) {
    value = -1
  }
  const user = req.user

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
  if (voted) {
    return res.status(401).json({
      success: false,
      message: 'User has already voted'
    })
  }
  const newjv = await JodelVote.create({
    value: value
  })

  await user.addJodelVotes([newjv])
  await jp.addJodelVote([newjv])

  res.send()
}

const getJodelPost = async (req, res) => {
  'use strict'
  const postId = parseInt(req.params.id) || 0
  if (postId < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid postId'
    })
  }

  const jp = await JodelPost.findOne({
    where: {id: postId}
  })
  if (!jp) {
    return res.status(400).json({
      success: false,
      message: 'Failed to find post'
    })
  }
  const post = await jp.toJSON(jp)
  const opId = jp.userId
  const comments = await jp.getJodelComments().map(x => {
    const isOp = x.userId === opId
    const info = {
      isComment: true,
      text: x.text,
      isOp,
      createdAt: x.createdAt
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
    return res.status(400).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const allPosts = await jodelposts.getAllPostsAndCount(offset, limit)
  const allPostsJSON = await Promise.all(allPosts.rows.map(async (post) => {
    return post.toJSON(post)
  }))
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
  const as = await JodelVote.findAll({
    where: {createdAt: {gte: TIME_LIMIT_FOR_TRENDING}},
    include: [{model: JodelPost, as: 'Votes'}],
    order: [Sequelize.fn(`SUM`, Sequelize.col('value'))],
    group: ['postId'],
    offset: offset,
    limit: limit
  })
  const listedPosts = []
  for (let i = as.length - 1; i >= 0; i--) {
    const asd = await as[i].Votes.toJSON(as[i].Votes)
    listedPosts.push(asd)
  }
  await Promise.all(listedPosts)
  res.json({
    posts: listedPosts,
    success: true
  })
}

const getAllPostsByComments = async (req, res) => {
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const as = await JodelComments.findAll({
    where: {createdAt: {gte: TIME_LIMIT_FOR_TRENDING}},
    include: [{model: JodelPost, as: 'Comments'}],
    order: [Sequelize.fn(`COUNT`, Sequelize.col('postId'))],
    group: ['postId'],
    offset: offset,
    limit: limit
  })
  const listedPosts = []
  for (let i = as.length - 1; i >= 0; i--) {
    const asd = await as[i].Comments.toJSON(as[i].Comments)
    listedPosts.push(asd)
  }
  await Promise.all(listedPosts)
  res.json({
    posts: listedPosts,
    success: true
  })
}
const getAllUserPostsByComments = async (req, res) => {
  const user = req.user
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const as = await user.getJodelComments({
    include: [{model: JodelPost, as: 'Comments'}],
    order: [Sequelize.fn(`COUNT`, Sequelize.col('postId'))],
    group: ['postId'],
    limit: limit,
    offset: offset
  })
  const listedPosts = []
  for (let i = as.length - 1; i >= 0; i--) {
    const asd = await as[i].Comments.toJSON(as[i].Comments)
    listedPosts.push(asd)
  }
  await Promise.all(listedPosts)
  res.json({
    posts: listedPosts,
    success: true
  })
}

const getAllUserPosts = async (req, res) => {
  const user = req.user
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const posts = await user.getJodels({
    order: ['id'],
    limit: limit,
    offset: offset
  })
  const allPostsJSON = await Promise.all(posts.map(async (post) => {
    return post.toJSON(post)
  }))
  res.json({
    posts: allPostsJSON,
    success: true
  })
}

const getAllUserPostsByVotes = async (req, res) => {
  const user = req.user
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  await console.log('..................')
  const as = await user.getJodels({
    attributes: {
      include: [
        [Sequelize.fn(`SUM`, Sequelize.col('JodelVotes.value')), 'votes']
      ]
    },
    include: [{
      model: JodelVote,
      as: 'JodelVotes',
      attributes: ['value'],
      required: false
    }],
    offset: offset,
    limit: limit
  })
  /*  const as = await user.getJodels({
    include: [{
      model: JodelVote,
      as: 'JodelVote',
      attributes: [["value", "votes"]]
      //attributes: [[Sequelize.fn(`SUM`, Sequelize.col('value')), 'votes']]
//      attributes: [["value", 'votes']]
    //    order: [['JodelVote', 'votes']]
    }],
    offset: offset,
    limit: limit
    order: [[Sequelize.fn]]
  }) */
  await console.log('..................')
  console.log(as)
  console.log(as[0].JodelVote)
  const listedPosts = []
  for (let i = as.length - 1; i >= 0; i--) {
    const asd = await as[i].Votes.toJSON(as[i].Votes)
    listedPosts.push(asd)
  }
  await Promise.all(listedPosts)
  res.json({
    posts: listedPosts,
    success: true
  })
}

const addFavourite = async (req, res) => {
  const postId = req.body.jodelId
  // console.log(postId)
  const user = req.user
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
    return res.status(400).json({
      success: false,
      message: 'Failed to find post'
    })
  }

  const isFav = await service.isFavourite(jp, user)
  if (isFav) {
    return res.status(400).json({
      success: false,
      message: 'That is already a favourite'
    })
  }

  await jp.addFavouriteUser([user])
  res.json({success: true})
}

const getAllUserFavourites = async (req, res) => {
  const user = req.user
  const offset = parseInt(req.params.offset) || 0
  const limit = 12
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const as = await user.getUserFavourites({
    offset: offset,
    limit: limit,
    order: ['id']
  })
  console.log(as)
  const allPostsJSON = await Promise.all(as.map(async (post) => {
    return post.toJSON(post)
  }))
  res.json({
    posts: allPostsJSON,
    success: true
  })
}

module.exports = {
  newPost,
  addJodelComment,
  addJodelVote,
  getJodelPost,
  getAllPosts,
  getAllPostsByVotes,
  getAllPostsByComments,
  getAllUserPostsByComments,
  getAllUserPostsByVotes,
  getAllUserPosts,
  addFavourite,
  getAllUserFavourites,
  reportPost,
  reportComment,
  getAllReports,
  deleteReport,
  deletePost,
  deleteComment,
  deleteFavourite
}
