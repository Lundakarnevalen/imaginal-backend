'use strict'

const orders = require('../models/order')
const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')
const orderLines = require('../models/orderLine')
const storageContents = require('../models/storageContents')
const items = require('../models/item')

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
    console.log('---------------------------------------------')
    console.log(req.body)
    console.log(req.params)
    console.log(req.params.orderId)
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
  return orderLines.OrderLine.findAll({
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
      console.log('_-----------------------------__---_')
      console.log(req.user.dataValues)
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
      const theOrders = await orders.Order.findAll({
        where: { storageLocationId: req.params.storageLocationId }
      })
      console.log('""""""""""""-----------------_""""')
      console.log(theOrders)
      if (theOrders.length > 0) {
        theOrders.map(
          order => (order.orderLines = getOrderLinesFromOrderId(order.id)))
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

// Checkout what to do
// 1. Check parameters
// 2. Find variables needed, order, orderLineList
// 3. Get all orderlines from db
// 4. Iterate over reqOrderLines and set dbOrderLines.quantityDelivered where
//   orderLinesId is the correct one and subtract storage content. If delivered
//   is bigger than ordered set ordered to delivered.
// 5. if all orderLines in Order is set to ordered value, set order to delivered.

const checkoutOrderLines = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const reqOrderLines = req.body.orderLines

      if (reqOrderLines.length <= 0) {
        return res.status(400).json({
          success: false,
          message: 'No orderLines provided.'
        })
      }
      const order = await orders.Order.findOne({
        where: { id: reqOrderLines[0].orderId }
      })
      const reqStorageLocationId = order.dataValues.storageLocationId
      let failed = false

      await reqOrderLines.map(async reqOrderLine => {
        const orderLine = await orderLines.OrderLine.findOne({
          where: { id: reqOrderLine.id }
        })
        // const item = await items.Item.findOne({
        //   where: { id: orderLine.dataValues.itemId }
        // })

        const storageContent = await storageContents.StorageContent.findOne({
          where: {
            itemId: orderLine.dataValues.itemId,
            storageLocationId: reqStorageLocationId
          }
        })

        if (storageContent.dataValues.quantity >= reqOrderLine.quantityDelivered &&
          orderLine.quantityDelivered + reqOrderLine.quantityDelivered <= orderLine.quantityOrdered) {
          storageContents.StorageContent.update(
            { quantity: storageContent.dataValues.quantity -= reqOrderLine.quantityDelivered },
            {
              where: {
                itemId: orderLine.dataValues.itemId,
                storageLocationId: reqStorageLocationId
              }
            }
          ).then((result) => {
            if (result === 1) {
              orderLines.OrderLine.update({ quantityDelivered: orderLine.quantityDelivered + reqOrderLine.quantityDelivered },
                { where: { id: reqOrderLine.id } })
            }
          })
        } else {
          failed = true
        }
      })

      if (failed) {
        return res.status(400).json({
          success: false,
          message: 'Failed to checkout product due to orderline exeding ordered value'
        })
      }
      const checkOrderLines = await orderLines.OrderLine.findAll({
        where: { orderId: reqOrderLines.orderId }
      })
      let checkOrderFinished = false
      checkOrderLines.map(checkOrderLine => {
        if (checkOrderLine.quantityOrdered <= checkOrderLine.quantityDelivered) checkOrderFinished = true
      })
      if (checkOrderFinished) {
        orders.Order.update({ delivered: true }, { where: { id: reqOrderLines.orderId } })
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully checked order out'
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

const getQuantityOfOrderedItems = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const list = []
      const allItems = await items.Item.findAll()
      for (const item of allItems) {
        const itemId = item.id
        const orderedItems = await orderLines.OrderLine.findAll({
          where: { itemId: itemId }
        })
        let totQuantity = 0
        if (orderedItems.length > 0) {
          for (const order of orderedItems) {
            const orderQuantity = order.quantityOrdered - order.quantityDelivered
            totQuantity += orderQuantity
          }
        }
        const object = {
          itemId: itemId,
          quantity: totQuantity
        }
        list.push(object)
      }
      return res.status(200).json({
        success: true,
        data: list
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
      message: 'Failed to get ordered items'
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
  getQuantityOfOrderedItems
}
