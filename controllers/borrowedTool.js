'use strict'

const tags = require('.../models/tag')
const tools = require('.../models/tool')
const toolTags = require('../models/toolTag')
const borrowedTool = require('../models/borrowedTool')

const getAllItems = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const itemList = await items.Item.findAll()
      return res.json({
        success: true,
        data: itemList
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
      message: 'Failed to retrive items'
    })
  }
}
