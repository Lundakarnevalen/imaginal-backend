'use strict'

const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')


const getAllWarehouseUsers = async(req, res) =>  {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    
    if (hasAccess) {
      const warehouseUsers = await WarehouseUser.WarehouseUser.findAll()
      return res.json({
        success: true,
        data: warehouseUsers
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

const getWarehouseUserById = async(req, res) =>  {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const warehouseUsers = await WarehouseUser.WarehouseUser.findOne({
        where: {id: req.body.id}
      })
      return res.json({
        success: true,
        data: warehouseUsers
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

const getWarehouseUserByCostBearer= async(req, res) =>  {
  try {
    const hasAccess = await userRoles.hasWarehouseManagerAccess(req)
    if (hasAccess) {
      const warehouseUsers = await WarehouseUser.WarehouseUser.findAll({
        where: { costBearerId: req.body.id }
      })
      return res.json({
        success: true,
        data: warehouseUsers
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

const getAllCostbearers = async(req, res) =>  {
  try {
    const hasAccess = await userRoles.hasWarehouseManagerAccess(req)
    if (hasAccess) {
      const costBearers = await WarehouseUser.CostBearer.findAll()
      return res.json({
        success: true,
        data: costBearers
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

module.exports = {
  getAllWarehouseUsers,
  getWarehouseUserById,
  getWarehouseUserByCostBearer,
  getAllCostbearers
}
