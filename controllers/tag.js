'use strict'

const tags = require('../models/tag')

const getAllTags = async (req, res) => {
  const tagList = await tags.Tag.findAll().map(oneTag => {
    const list = {}
    list['name'] = oneItem.name
    return list
  })
  return res.json({
    success: true,
    message: tagList
  })
}

const addTag = async (req, res) => {
  if (!req.body.name) {
    return res.json({ 
      success: false,
      message: 'Invalid parameter'
    })
  }

  const allTags = await tags.Item.findAll()
  const tagExists = await allTags.filter(tags => tags.name === req.body.name)
  if (tagExists.length > 0) {
    return res.json({
      success: false,
      message: 'Tag already exists'
    })
  } else {
    createTag(req, res)
  }
}

const createTag = function (req, res) {
  tags.Tag.create({
    name: req.body.name,
  })
  res.json({
    success: true,
    message: 'Tag added'
  })
}

module.exports = {
  addItem,
  getAllItems,
}
