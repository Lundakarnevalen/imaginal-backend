'use strict'

<<<<<<< Updated upstream
const tools = require('../models/tools')
=======
const tools = require('../models/tool')
>>>>>>> Stashed changes
const userRoles = require('../models/userrole')

const addTool = async (req, res) => {
  try {
    if (!req.body.name || !req.body.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameter'
      })
    }
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const tool = await tools.Tool.findOne({
        where: {
          name: req.body.name
        }
      })

      if (tool) {
        tool.quantity += req.body.quantity
        return res.json({
          success: true,
          message: 'Tool quantity has been added'
        })
      } else {
        return createTool(req, res)
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
      message: 'Failed to add tool'
    })
  }
}

const getAllTools = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const toolList = await tools.Tool.findAll()
      return res.json({
        success: true,
        data: toolList
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
      message: 'Failed to get tools'
    })
  }
}

const removeTool = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const toolId = req.params.toolid
      const tool = await tools.Tool.findOne({
        where: {id: toolId}
      })
      if (!tool) {
        return res.status(400).json({
          success: false,
          message: 'Tool not found'
        })
      }
      await tool.destroy()
      return res.json({
        success: true,
        message: 'Tool deleted'
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
      message: 'Failed to delete tool'
    })
  }
}

// Private method
const createTool = function (req, res) {
  tools.Tool.create({
    name: req.body.name,
    description: req.body.description || '',
    imgUrl: req.body.imgUrl || '',
    quantity: req.body.quantity
  })
  return res.json({
    success: true,
    message: 'Tool added'
  })
}

module.exports = {
  addTool,
  getAllTools,
  removeTool
}
