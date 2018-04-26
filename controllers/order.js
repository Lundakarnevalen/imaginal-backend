'use strict'

const orders = require('../models/order')
const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')
const orderLines = require('../models/orderLine')
const storageContents = require('../models/storageContents')
const items = require('../models/item')
const locations = require('../models/storageLocation')
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
      getQuantity(req, res)
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

const getQuantityOfOrderedItemsInLocation = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const findLocation = await locations.StorageLocation.findOne({
        where: { id: req.params.storageLocationId }
      })
      if (!findLocation) {
        return res.status(400).json({
          success: false,
          message: 'No location with that id exists'
        })
      } else {
        getQuantity(req, res)
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
      message: 'Failed to get ordered items'
    })
  }
}

const getQuantityOfOrderedItemsForCostBearer = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const findCostBearer = await costBearers.CostBearer.findOne({
        where: { id: req.params.costBearerId }
      })
      if (!findCostBearer) {
        return res.status(400).json({
          success: false,
          message: 'No cost bearer with that id exists'
        })
      } else {
        getQuantity(req, res)
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
      message: 'Failed to get ordered items'
    })
  }
}

/** Private method */
const getQuantity = async (req, res) => {
  const list = []
  const allItems = await items.Item.findAll()
  const itemIds = allItems.map(item => item.id)

  const itemList = await items.Item.findAll({
    include: [{
      model: orders.Order,
      through: {
        attributes: ['quantityOrdered', 'quantityDelivered'],
        where: { itemId: itemIds }
      }
    }]
  })

  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i]
    let itemOrders = await item.Orders

    if (req.params.storageLocationId) {
      itemOrders = itemOrders.filter(function (oneOrder) {
        return oneOrder.storageLocationId === parseInt(req.params.storageLocationId)
      })
    } else if (req.params.costBearerId) {
      const listOfWarehouseUsers = await warehouseUser.WarehouseUser.findAll({
        where: { costBearerId: req.params.costBearerId }
      })
      const warehouseUserIds = listOfWarehouseUsers.map(user => user.id)

      itemOrders = itemOrders.filter(function (oneOrder) {
        return warehouseUserIds.filter(function (oneId) {
          return oneId === oneOrder.warehouseUserId
        }).length > 0
      })
    }

    const totQuantity = itemOrders.reduce(function(preVal, order) {
      return preVal + order.OrderLines.quantityOrdered
    }, 0)

    const notDeliveredQuantity = itemOrders.reduce(function(preVal, order) {
      return preVal + order.OrderLines.quantityOrdered - order.OrderLines.quantityDelivered
    }, 0)

    const object = {
      itemId: item.id,
      name: item.name,
      articleNumber: item.articleNumber,
      supplier: item.supplier,
      unit: item.unit,
      salesPrice: item.salesPrice,
      quantityNotDelivered: notDeliveredQuantity,
      totalPrice: totQuantity * item.salesPrice
    }
    list.push(object)
  }
  return res.status(200).json({
    success: true,
    data: list
  })
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
  getQuantityOfOrderedItems,
  getQuantityOfOrderedItemsInLocation,
  getQuantityOfOrderedItemsForCostBearer
}
