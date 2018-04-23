'use strict'

const userRoles = require('../models/userrole')
const costBearer = require('../models/costBearer')
const warehouseUser = require('../models/warehouseUser')

const getAllWarehouseUsers = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)

    if (hasAccess) {
      const warehouseUsers = await warehouseUser.WarehouseUser.findAll()
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
      message: 'Failed to retrieve warehouseUsers'
    })
  }
}

const getWarehouseUserById = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const userId = req.user.id
      const warehouseUsers = await warehouseUser.WarehouseUser.findOne({
        where: { userId: userId }
      })
      if (warehouseUsers) {
        return res.json({
          success: true,
          data: warehouseUsers
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Cant find warehouseuser connected to this user'
        })
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
      message: 'Failed to retrieve warehouseUser'
    })
  }
}

const getWarehouseUserByCostBearer = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const warehouseUsers = await warehouseUser.WarehouseUser.findAll({
        where: { costBearerId: req.params.costBearerId }
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
      message: 'Failed to get warehouseUser'
    })
  }
}

const getAllCostBearers = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const costBearers = await costBearer.CostBearer.findAll()
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
  getAllCostBearers
}
