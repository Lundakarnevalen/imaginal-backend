'use strict'

const orders = require('../models/order')
const orderlines = require('../models/orderLine')
const warehouseUser = require('../models/warehouseUser')

const createOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if ((!req.body.storageLocationID || !req.body.warehouseUserId || !req.body.orderlines)
        || !(await req.body.orderlines.every(body => body.itemId && body.quantity))) {
        return res.status(400).json({
          success: false,
          message: "Missing parameters"
        })
      }
      const findWarehouseUser = warehouseUser.WarehouseUser.findOne({
        where: { userId: req.user.id }
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
      return res.status(200).json({
        success: true,
        message: "Order created"
      })
      //throw error from createOrderLine?
      return res.status(400).json({
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
      quantityDelivered: 0,
      orderId: order.id,
      itemId: body.itemId
    })
  }
}

const removeOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if (!req.body.id) {
        return res.status(400).json({
          success: false,
          message: "Missing parameters"
        })
      }
      const theOrder = await findOrder(req.body.id)
      if (!theOrder)
        return res.status(400).json({
          success: false,
          message: "No such orderID exists"
        })
      await orderlines.OrderLine.destroy({ where: { orderID: req.body.orderId, } })
      await orders.Order.destroy({ where: { id: req.body.orderId } })
      return res.status(200).json({
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

const findOrder = async (orderID) => {
  return orders.Order.findById(orderID)
}

const getOrderLinesFromOrderId = async (orderID) => {
  return orderlines.OrderLine.findAll({
    where: {
      orderId: orderID
    }
  })
}

const editOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      if (!req.body.id) {
        return res.status(400).json({
          success: false,
          message: "Invalid parameters"
        })
      }
      const theOrder = await findOrder(req.body.id)
      if (!theOrder)
        return res.status(400).json({
          success: false,
          message: "No such orderID exists"
        })
      else {
        if (req.body.delivered != null)
          theOrder.delivered = req.body.delivered
        theOrder.deliveryDate = (req.body.delivered) ? new Date() : null
      }
      if (req.body.return != null)
        theOrder.return = req.body.return
      await theOrder.save()
      return res.status(200).json({
        success: true,
        message: "Order edited"
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
      message: 'Failed to edit order'
    })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      const allOrders = await orders.Order.findAll()
      allOrders.forEach(
        order => (order.orderlines = getOrderLinesFromOrderId(order.id)))
      return res.status(200).json({
        success: true,
        data: allOrders
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

const getOrdersOnUser = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const theOrders = await orders.Order.findAll({
        where: { warehouseUserID: req.body.warehouseUserID }
      })
      if (theOrders.length > 0) {
        theOrders.forEach(
          order => order.orderlines = getOrderLinesFromOrderId(order.id))
        return res.status(200).json({
          success: true,
          data: theOrders
        })
      }
      else {
        return res.status(400).json({
          success: false,
          message: "No orders on that user"
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
      message: 'Failed to get all orders'
    })
  }
}

const getOrdersOnSection = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const theOrders = await orders.Order.findAll({
        where: { storageLocationID: req.body.storageLocationID }
      })
      if (theOrders.length > 0) {
        theOrders.forEach(
          order => order.orderlines = getOrderLinesFromOrderId(order.id))
        return res.status(200).json({
          success: true,
          data: theOrders
        })
      }
      else {
        return res.status(400).json({
          success: false,
          message: "No orders on that section"
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
      message: 'Failed to get all orders'
    })
  }
}

module.exports = {
  createOrder,
  removeOrder,
  editOrder,
  getAllOrders,
  getOrdersOnSection,
  getOrdersOnUser
}