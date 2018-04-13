'use strict'

const orders = require('../models/order')
const orderlines = require('../models/orderline')
const warehouseUser = require('../models/warehouseUser')

const createOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if (!req.body.storageLocationID || !req.body.deliveryDate || !req.body.orderlines) {
        return res.json({
          success: false,
          message: "Missing parameters"
        })
      }
      const findWarehouseUser = warehouseUser.WarehouseUser.findOne({
        where: {userId: req.user.id}
      })
      const order = await orders.Order.create({
        storageLocationId: req.body.storageLocationId,
        userId: req.user.id,
        deliveryDate: req.body.deliveryDate,
        delivered: false,
        return: req.body.return || false,
        WarehouseUserId: findWarehouseUser.id
      })
      await req.body.orderLines.forEach(orderLine => createOrderLine(order, body))
      return res.json({
        success: true,
        message: "Order created"
      })
      //throw error from createOrderLine?
      return res.json({
        success: false,
        message: "Failed to create orderlines"
      })
    }
    else {
      return res.status(401).json({
        success: false,
        message: 'Go away!'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create order'
    })
  }
}

const createOrderLine = (order, body) => {
    //if (!body.quantity || body.itemID)
        //throw error
        //const error = true
    /*else*/ {
    orderlines.OrderLine.create({
      quantity: body.quantity,
      orderId: order.id,
      itemId: body.itemI
    })
  }
}


const removeOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if (!req.body.id) {
        return res.json({
          success: false,
          message: "Missing parameters"
        })
      }
      const theOrder = await findOrder(req.body.id)
      if (!theOrder)
        return res.json({
          success: false,
          message: "No such orderID exists"
        })
      //check if destroy is successful?
      const order = orders.Order.findOne({ where: { id: req.body.orderId } })

      await orderlines.OrderLine.destroy({ where: { orderID: req.body.orderId, } })
      await orders.Order.destroy({ where: { id: req.body.orderId } })
      return res.json({
        success: true,
        message: "Order removed"
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
      message: 'Failed to remove order'
    })
  }
}



const findOrder = (orderID) => {
  return orders.Order.findById(orderID)
  //return orderlines associated with order?
}

const editOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      if (!req.body.id) {
        return res.json({
          success: false,
          message: "Invalid parameters"
        })
      }
      const theOrder = await findOrder(req.body.id)
      if (!theOrder)
        return res.json({
          success: false,
          message: "No such orderID exists"
        })
      else {
        //can only set delivered from false to true
        if (req.body.delivered) {
          theOrder.delivered = req.body.delivered
          theOrder.deliveryDate = new Date()
        }
        //can only set return from false to true
        if (req.body.return)
          theOrder.return = req.body.return
        await theOrder.save()
        return res.json({
          success: true,
          message: "Order edited"
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
      message: 'Failed to edit order'
    })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const allOrders = await orders.Order.findAll()
      return res.json({
        success: true,
        allOrders
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
      message: 'Failed to get all orders'
    })
  }
}


module.exports = {
  createOrder,
  getAllOrders,
  editOrder,
  removeOrder
}