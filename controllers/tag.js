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
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
      if (hasAccess) {
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
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const tagList = await tags.Tag.findAll()
      return res.json({
        success: true,
        data: tagList
      })
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

const removeTag = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const tagId = req.params.tagid
      const tag = await tags.Tag.findOne({
        where: { id: tagId }
      })
      if (!tag) {
        return res.status(400).json({
          success: false,
          message: 'Tag not found'
        })
      }
      await tag.destroy()
      return res.json({
        success: true,
        message: 'Tag deleted'
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Go away!'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete tag'
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
