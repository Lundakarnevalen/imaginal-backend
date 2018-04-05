'use strict'

const tags = require('../models/tag')
const userRoles = require('../models/userrole')

const addTag = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameter'
      })
    }

    if (userRoles.hasWarehouseAdminAccess(req)) {
      const tag = await tags.Tag.findOne({
        where: {
          name: req.body.name
        }
      })

      if (tag) {
        return res.status(400).json({
          success: false,
          message: 'Tag already exist'
        })
      } else {
        createTag(req, res)
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Go away!'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add tag'
    })
  }
}

const getAllTags = async (req, res) => {
  if (userRoles.hasWarehouseCustomerAccess(req)) {
    const tagList = await tags.Tag.findAll()
    return res.json({
      success: true,
      message: tagList
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const removeTag = function (req, res) {
  if (userRoles.hasWarehouseAdminAccess(req)) {
    const tag = tags.Tag.findOne({
      where: {name: req.body.name}
    })
    const result = tags.Tag.destroy(tag)
    if (result) {
      return res.json({
        success: true,
        message: 'Tag deleted'
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Tag not found'
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

// Private method
const createTag = function (req, res) {
  tags.Tag.create({
    name: req.body.name
  })
  res.json({
    success: true,
    message: 'Tag added'
  })
}

module.exports = {
  addTag,
  getAllTags,
  removeTag
}
