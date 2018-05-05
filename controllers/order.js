'use strict'

const orders = require('../models/order')
const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')
const orderLines = require('../models/orderLine')
const storageContents = require('../models/storageContents')
const costBearers = require('../models/costBearer')
// const items = require('../models/item')

const createOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      if ((!req.body.storageLocationId || !req.body.orderLines) ||
        !(await req.body.orderLines.map(body => body.itemId && body.quantity))) {
        return res.status(400).json({
          success: false,
          message: 'Missing parameters'
        })
      }

      const findWarehouseUser = await warehouseUser.WarehouseUser.findOne({
        where: { userId: req.user.dataValues.id }
      })

      if (!findWarehouseUser) {
        return res.status(400).json({
          success: false,
          message: 'User dont have permission to create an order.'
        })
      }

      const order = await orders.Order.create({
        storageLocationId: req.body.storageLocationId,
        orderDeliveryDate: req.body.deliveryDate || null,
        checkedOut: false,
        return: req.body.return || false,
        returnDate: req.body.returnDate || null,
        warehouseUserId: findWarehouseUser.id
      })

      if (req.body.orderLines.length > 0) {
        await req.body.orderLines.forEach(orderLine => createOrderLine(order, orderLine))
      } else {
        return res.status(400).json({
          success: false,
          message: 'No orderlines specified'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Order created'
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
      message: 'Failed to create order'
    })
  }
}

const createOrderLine = (order, body) => {
  orderLines.OrderLine.create({
    quantityOrdered: body.quantity,
    quantityDelivered: 0,
    orderId: order.id,
    itemId: body.itemId
  })
}

const removeOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      if (!req.params.orderId) {
        return res.status(400).json({
          success: false,
          message: 'Missing parameters'
        })
      }
      const theOrder = await findOrder(req.params.orderId)
      if (!theOrder) {
        return res.status(400).json({
          success: false,
          message: 'No such orderId exists'
        })
      }
      await orderLines.OrderLine.destroy({ where: { orderId: req.params.orderId } })
      await orders.Order.destroy({ where: { id: req.params.orderId } })
      return res.status(200).json({
        success: true,
        message: 'Order removed'
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
  const orderLine = await orderLines.OrderLine.findAll({
    where: {
      orderId: orderId
    }
  })
  let orderLinesList = []
  orderLine.forEach(line => {
    orderLinesList.push(line.dataValues)
  })
  return orderLinesList
}

const editOrder = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
    if (hasAccess) {
      if (!req.body.id) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parameters'
        })
      }
      const theOrder = await findOrder(req.body.id)
      if (!theOrder) {
        return res.status(400).json({
          success: false,
          message: 'No such orderId exists'
        })
      } else {
        if (req.body.delivered != null) { theOrder.delivered = req.body.delivered }
        theOrder.deliveryDate = (req.body.delivered) ? new Date() : null
      }
      if (req.body.return != null) { theOrder.return = req.body.return }
      await theOrder.save()
      return res.status(200).json({
        success: true,
        message: 'Order edited'
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

const getOrderById = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const order = await orders.Order.findOne({
        where: { id: req.params.id }
      })
      console.log(order)
      return res.status(200).json({
        success: true,
        data: order
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

const getAllOrders = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const allOrders = await orders.Order.findAll()
      allOrders.forEach(
        order => (order.orderLines = getOrderLinesFromOrderId(order.id)))
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
      const dbWarehouseUser = await warehouseUser.WarehouseUser.findOne({
        where: { userId: req.user.dataValues.id }
      })
      const theOrders = await orders.Order.findAll({
        where: { warehouseUserId: dbWarehouseUser.id }
      })
      if (theOrders.length > 0) {
        theOrders.forEach(
          order => (order.orderLines = getOrderLinesFromOrderId(order.id)))
        return res.status(200).json({
          success: true,
          data: theOrders
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'No orders on that user'
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
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      let theOrders = await orders.Order.findAll({
        where: { storageLocationId: req.params.storageLocationId }
      })
      if (theOrders.length > 0) {
        await Promise.all(theOrders.map(async order => {
          order.dataValues.orderLines = await getOrderLinesFromOrderId(order.id)
        }))

        return res.status(200).json({
          success: true,
          data: theOrders
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'No orders on that section'
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
    if (!hasAccess) {
      return res.status(401).json({
        success: false,
        message: 'Go away!'
      })
    }
    const reqOrderLines = req.body.orderLines

    if (reqOrderLines.length <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No orderLines provided.'
      })
    }
    let dbInfo = {
      orderLines: null,
      storageContent: null
    }
    const order = await orders.Order.findOne({
      where: { id: reqOrderLines[0].orderId }
    })
    const reqStorageLocationId = order.dataValues.storageLocationId
    const reqOrderLinesId = reqOrderLines.map(reqOrderLine => reqOrderLine.id)

    dbInfo.orderLines = await orderLines.OrderLine.findAll({
      where: { id: reqOrderLinesId }
    })

    await Promise.all(dbInfo.orderLines.map(async orderLine => {
      dbInfo.storageContent = await storageContents.StorageContent.findOne({
        where: {
          itemId: orderLine.dataValues.itemId,
          storageLocationId: reqStorageLocationId
        }
      })
    }))

    dbInfo.orderLines.forEach(async orderLine => {
      reqOrderLines.forEach(async reqOrderLine => {
        if (orderLine.id === reqOrderLine.id) {
          // Get values before changing database object to validate that enough in storage and quantityOrdered
          const quantityStorage = dbInfo.storageContent.quantity - reqOrderLine.quantity
          const quantityOrderLine = orderLine.quantityDelivered + reqOrderLine.quantity

          if ((quantityStorage > 0) && (quantityOrderLine <= orderLine.quantityOrdered)) {
            dbInfo.storageContent.quantity = quantityStorage
            orderLine.quantityDelivered = quantityOrderLine
            await dbInfo.storageContent.save()
          }
        }
      })
      await orderLine.save()
    })
    return res.status(200).json({
      success: true,
      message: 'Successfully checked order out'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get all orders'
    })
  }
}

const getOrdersOnCostBearer = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const userIds = await warehouseUser.WarehouseUser.findAll({
        where: { costBearerId: req.params.costBearerId}
      }).userId
      const theOrders = await orders.Order.findAll({
        where: { warehouseUserId: userIds }
      })
      if (theOrders.length > 0) {
        theOrders.forEach(
          order => (order.orderLines = getOrderLinesFromOrderId(order.id)))
        return res.status(200).json({
          success: true,
          data: theOrders
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'No orders for this cost bearer'
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
  getOrdersOnUser,
  checkoutOrderLines,
  getOrderById,
  getOrdersOnCostBearer
}
