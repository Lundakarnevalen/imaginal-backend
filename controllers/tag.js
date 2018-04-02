'use strict'

const Tags = require('../models/tag')
const UserRoles = require('../models/userrole')

const addTag = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid parameter'
    })
  }

  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)
  const isWarehouseManager = await UserRoles.hasRole(req.user, UserRoles.MANAGER)
  
  if (isAdmin || isWarehouseManager)  {
    const tag = await Tags.Tag.findOne({
      where: {
        name: req.body.name,
      }
    })

    if (tag) {
      return res.status(400).json({
        success: false,
        message: 'Tag already exist'
      })
    }
    else {
      createTag(req, res)
    }
  }
  else {
   return res.status(401).json({
     success: false,
     message: 'Go away!'
   }) 
  }
}

const removeTag = function (req, res) {
  const name = req.body.name

  findUserAndRole(req, res, email, roleId, function (user, role) {
    user.removeRole([role]).then(() => {
      return res.json({
        success: true,
        message: 'tag removed'
      })
    })
  })
}

const createTag = function (req, res) {
  Tags.Tag.create({
    name: req.body.name,
  })
  res.json({
    success: true,
    message: 'Tag added'
  })
}

module.exports = {
  addTag,
}
