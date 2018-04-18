'use strict'

const orders = require('../models/order')
const orderlines = require('../models/orderLine')
const warehouseUser = require('../models/warehouseUser')
const storageContent = require('../models/storageContents')
const storageLocation = require('../models/storageLocation')

const createOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if ((!req.body.storageLocationId || !req.body.warehouseUserId || !req.body.orderlines)
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
        orderDeliveryDate: req.body.deliveryDate || null,
        checkedOut: false,
        return: req.body.return || false,
        returnDate: req.body.returnDate || null,
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
    //if (!body.quantity || body.itemId)
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
          message: "No such orderId exists"
        })
      await orderlines.OrderLine.destroy({ where: { orderId: req.body.orderId, } })
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

const findOrder = async (orderId) => {
  return orders.Order.findById(orderId)
}

const getOrderLinesFromOrderId = async (orderId) => {
  return orderlines.OrderLine.findAll({
    where: {
      orderId: orderId
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
          message: "No such orderId exists"
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
        where: { warehouseUserId: req.body.warehouseUserId }
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
        where: { storageLocationId: req.body.storageLocationId }
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

const checkoutOrderLines = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const reqOrderLines = req.body.orderLines
      const reqStorageLocationId = await order.Order.findAll({
        where: {id: req.body.orderLines[0].orderId}
      })[0].storageLocationId

      reqOrderLines.map(reqOrderLine => {
        const orderLine = orderlines.OrderLine.findOne({
          where: { id: reqOrderLine.id }
        })
        if (orderLine.quantityOrdered >= reqOrderLine.quantityDelivered) {
          const itemContent = storageContent.StorageContent.findOne({
            where: {
              itemId: reqOrderLine.itemId,
              storageLocationId: storageLocationId
            }
          })
        
        if (itemContent.quantity >= reqOrderLine.quantityDelivered) {
          const s = storageContents.Sto
          itemContent.quantity -= reqOrderLine.quantityDelivered
          orderLine.quantityDelivered = reqOrderLine.quantityDelivered

        } else {
          item = items.Item.findOne({
            where: { id: orderLine.itemId }
          })
          return res.status(400).json({
            success: false,
            message: 'Failed to checkout product where name is' + item.name +
              'due to not enough in storage!'
          })
        }
        } else {
          item = items.Item.findOne({
            where: { id: orderLine.itemId }
          })
          return res.status(400).json({
            success: false,
            message: 'Failed to checkout product where name is' + item.name +
              'due to more checked out then ordered!'
          })
        }
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
  removeOrder,
  editOrder,
  getAllOrders,
  getOrdersOnSection,
  getOrdersOnUser,
  checkoutOrderLines
}