'use strict'

const tools = require('.../models/tool')
const borrowedTools = require('../models/borrowedTool')
const userRoles = require('../models/userrole')

const rentTool = async (req, res) => {
  try {
    if (!req.body.toolId || !req.body.warehouseUserId || !req.body.startDate || !req.body.endDate || !req.body.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameter'
      })
    }
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const rentals = await tools.Tool.findById(req.body.toolId, {
        include: {
          model: borrowedTools.BorrowedTool,
          where: {
            toolId: req.body.toolId,
            $or: [
              {
                startDate: {
                  $between: [req.body.startDate, req.body.endDate]
                },
                endDate: {
                  $between: [req.body.startDate, req.body.endDate]
                }
              }
            ]
          }
        }
      })

      const nbrAvailable = rentals.BorrowedTool.reduce((acc, curr) => {
        if(curr.returnDate != null && curr.returnDate <= req.body.startDate){
          return acc + curr.quantity
        }
        return acc
      })

      if (req.body.quantity > nbrAvailable){
        return res.status(401).json({
          success: false,
          message: `There are not enough tool(s) available (${nbrAvailable} left)`
        })
      }
      else{
        return createRental(req)
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    })
  }
}

//const returnTool

//const editLease

//delete lease

//Private methods
const createRental = async (req, res) => {
  const rental = await borrowedTools.BorrowedTool.findCreateFind({
    where: {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      checkedOutDate: req.body.check || null,
      returnedDate: null,
      warehouseUserId: req.body.warehouseUserId,
      toolId: req.body.toolId,
      quantity: req.body.quantity,
    }
  })
  return res.json({
    success: true,
    message: 'Rental registered'
  })
}