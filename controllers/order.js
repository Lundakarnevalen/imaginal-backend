'use strict'

const orders = require('../models/order')
const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')
const orderLines = require('../models/orderLine')
const storageContents = require('../models/storageContents')
const items = require('../models/item')
const user = require('../users/users')
const costBearers = require('../models/costBearer')

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
        return: false,
        returnDate: null,
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

const createReturn = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      if ((!req.body.storageLocationId || !req.body.orderLines) || !req.body.warehouseUserId ||
        !(await req.body.orderLines.map(body => body.itemId && body.quantity))) {
        return res.status(400).json({
          success: false,
          message: 'Missing parameters'
        })
      }

      const order = await orders.Order.create({
        storageLocationId: req.body.storageLocationId,
        orderDeliveryDate: new Date(),
        checkedOut: true,
        checkedOutDate: new Date(),
        return: true,
        returnDate: null,
        warehouseUserId: req.body.warehouseUserId
      })

      if (req.body.orderLines.length > 0) {
        const allOrderLines = await Promise.all(req.body.orderLines.map(orderLine => {
          return orderLines.OrderLine.create({
            quantityOrdered: orderLine.quantity,
            quantityDelivered: orderLine.quantity,
            orderId: order.id,
            itemId: orderLine.itemId
          })
        }))

        const storageLocationId = order.dataValues.storageLocationId

        Promise.all(allOrderLines.map(async (line) => {
          let content = await storageContents.StorageContent.findOne({
            where: {
              storageLocationId: storageLocationId,
              itemId: line.dataValues.itemId
            }
          })

          if (!content) {
            content = await storageContents.StorageContent.create({
              storageLocationId: storageLocationId,
              itemId: line.dataValues.itemId,
              quantity: line.dataValues.quantityOrdered
            })
          } else {
            content.quantity += line.dataValues.quantityOrdered
            content.save()
          }
        }))

        return res.status(200).json({
          success: true,
          message: 'Return created'
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'No orderlines specified'
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
      message: 'Failed to create return'
    })
  }
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

const appendNameToOrder = async (order) => {
  const middleUser = await warehouseUser.WarehouseUser.findOne({
    where: { id: order.warehouseUserId }
  })
  const finalUser = await user.User.findOne({
    where: { id: middleUser.userId },
    attributes: ['firstName', 'lastName']
  })
  order.dataValues.firstName = finalUser.firstName
  order.dataValues.lastName = finalUser.lastName
}

const getOrderById = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const theOrder = await orders.Order.findOne({
        where: { id: req.params.id },
        include: [{
          model: items.Item,
          through: { attributes: ['quantityOrdered', 'quantityDelivered'] }
        }]
      })
      await appendNameToOrder(theOrder)
      addPrice(theOrder)
      return res.status(200).json({
        success: true,
        data: theOrder
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
      const allOrders = await orders.Order.findAll({
        include: [{
          model: items.Item,
          through: { attributes: ['quantityOrdered', 'quantityDelivered'] }
        }]
      })
      await Promise.all(allOrders.map(async order => {
        await appendNameToOrder(order)
        await addPrice(order)
      }))
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
    return res.status(500).jso n({
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
        where: { warehouseUserId: dbWarehouseUser.id },
        include: [{
          model: items.Item,
          through: { attributes: ['quantityOrdered', 'quantityDelivered'] }
        }]
      })
      if (theOrders.length > 0) {
        await Promise.all(theOrders.map(async order => {
          await appendNameToOrder(order)
          await addPrice(order)
        }))
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
        where: { storageLocationId: req.params.storageLocationId },
        include: [{
          model: items.Item,
          through: { attributes: ['quantityOrdered', 'quantityDelivered', 'id'] }
        }]
      })
      if (theOrders.length > 0) {
        await Promise.all(theOrders.map(async order => {
          await appendNameToOrder(order)
          await addPrice(order)
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

/** Private method */
const addPrice = (order) => {
  order.dataValues.totalPrice = order.Items.reduce(function (preVal, item) {
    const price = item.salesPrice * item.OrderLines.quantityOrdered
    item.OrderLines.dataValues.priceOrderLine = price
    return preVal + price
  }, 0)
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
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const findWarehouseUser = await warehouseUser.WarehouseUser.findOne({
        where: { userId: req.user.dataValues.id }
      })
      if (!findWarehouseUser) {
        return res.status(400).json({
          success: false,
          message: 'No such warehouse users'
        })
      }

      const costBearer = await costBearers.CostBearer.findOne({
        where: { id: findWarehouseUser.costBearerId }
      })

      if (!costBearer) {
        return res.status(400).json({
          success: false,
          message: 'No such cost bearer'
        })
      }

      const findWarehouseUsers = await warehouseUser.WarehouseUser.findAll({
        where: { costBearerId: costBearer.id }
      })
      // This can never happen, but still
      if (!findWarehouseUsers) {
        return res.status(400).json({
          success: false,
          message: 'No warehouseusers connected to that costbearer'
        })
      }
      const ids = findWarehouseUsers.map(user => user.id)
      const theOrders = await orders.Order.findAll({
        where: { warehouseUserId: ids },
        include: [{
          model: items.Item,
          through: { attributes: ['quantityOrdered', 'quantityDelivered'] }
        }]
      })

      if (theOrders.length > 0) {
        await Promise.all(theOrders.map(async order => {
          await appendNameToOrder(order)
          await addPrice(order)
        }))
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
  createReturn,
  getAllOrders,
  getOrdersOnSection,
  getOrdersOnUser,
  checkoutOrderLines,
  getOrderById,
  getOrdersOnCostBearer
}
