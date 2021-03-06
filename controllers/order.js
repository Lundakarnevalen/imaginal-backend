'use strict'

// const Sequelize = require('sequelize')
const orders = require('../models/order')
const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')
const orderLines = require('../models/orderLine')
const storageContents = require('../models/storageContents')
const items = require('../models/item')
const tags = require('../models/tag')
const user = require('../users/users')
const storageLocations = require('../models/storageLocation')
const costBearers = require('../models/costBearer')
var AWS = require('aws-sdk')

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
      sendNotificationEmail(findWarehouseUser, req.body.storageLocationId)
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

const sendNotificationEmail = async (warehouseUser, storageLocationId, data = {}) => {
  // Need to get name on storage in some manner...
  // req.params.storageLocationId
  const sender = 'AIT.lager.notis@lundakarnevalen.se'

  const storageLocation = await storageLocations.StorageLocation.findOne({
    where: { id: storageLocationId }
  })
  const email = storageLocation.email
  // const email = 'martin.johansson@lundakarnevalen.se'
  const msg = 'A new order have been placed into storage location: ' + storageLocation.storageName
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: msg
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'New order: ' + storageLocation.storageName
        }
      },
      Source: sender
    }
    const ses = new AWS.SES({ apiVersion: '2010-12-01', region: 'eu-west-1' })
    // THIS LINE UNDERNEATH MAKES AWS SEND AN EMAIL! Uncomment on production!
    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
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
      } else {
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

          const storageLocationId = await order.dataValues.storageLocationId

          await Promise.all(allOrderLines.map(async (line) => {
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
              await content.save()
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
      await addPrice(theOrder)
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
    }
    const order = await orders.Order.findOne({
      where: { id: reqOrderLines[0].orderId }
    })
    const reqStorageLocationId = order.dataValues.storageLocationId
    const reqOrderLinesId = reqOrderLines.map(reqOrderLine => reqOrderLine.id)

    dbInfo.orderLines = await orderLines.OrderLine.findAll({
      where: { orderId: order.id }
    })

    let compDelivery = true
    for (let i = 0; i < reqOrderLines.length; i++) {
      const reqOrderLine = reqOrderLines[i]
      const dbOrderLine = dbInfo.orderLines.filter(o => o.id === reqOrderLine.id)[0]
      const olIdx = dbInfo.orderLines.indexOf(dbOrderLine)
      // Get values before changing database object to validate that enough in storage and quantityOrdered
      const quantityOrderLine = parseInt(dbOrderLine.quantityDelivered) + parseInt(reqOrderLine.quantity)
      dbInfo.orderLines[olIdx].quantityDelivered = quantityOrderLine

      dbInfo.orderLines.map(o => o.save())
      order.checkedOut = true
    }
    order.save()
    return res.status(200).json({
      success: true,
      message: 'Successfully checked out order!'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get all orders'
    })
  }
}

const storageIterator = async (orderLines, storageContent, reqStorageLocationId) => {
  if (orderLines.length === 0) return storageContent
  const orderLine = orderLines[0]
  const s = await storageContents.StorageContent.findOne({
    where: {
      itemId: orderLine.itemId,
      storageLocationId: reqStorageLocationId
    }
  })
  if (s) {
    storageContent.push(s)
  } else {
    return res.status(400).json({
      success: false,
      message: 'A product selected does not exist in storage location'
    })
  }
  return storageIterator(orderLines.slice(1), storageContent, reqStorageLocationId)
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

const getInventory = async (req, res) => {
  try {
    // const Op = Sequelize.Op
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const storageLocationId = req.params.storageLocationId
      const locationExists = await storageLocations.StorageLocation.findOne({
        where: { id: storageLocationId }
      })
      if (!locationExists) {
        return res.status(400).json({
          success: false,
          message: 'Location does not exist'
        })
      }
      let storage = await items.Item.findAll({
        include: [{
          required: true,
          model: storageLocations.StorageLocation,
          attributes: ['id', 'storageName', 'description'],
          through: {
            where: {
              storageLocationId: storageLocationId
              // If I have time I will fix this, but need fix on addInventory etc
              // quantity: {
              //   [Op.not]: [0]
              // }
            },
            attributes: ['id', 'quantity']
          }
        },
        {
          model: tags.Tag,
          attributes: ['name', 'id'],
          through: { attributes: [] }
        },
        {
          model: orders.Order,
          through: {
            attributes: ['quantityOrdered', 'quantityDelivered']
          }
        }]
      })

      storage.map(function (item) {
        const totQuantity = item.Orders.reduce(function (preVal, order) {
          return preVal + order.OrderLines.quantityOrdered - order.OrderLines.quantityDelivered
        }, 0)
        item.dataValues.ordered = totQuantity
      })

      return res.json({
        success: true,
        data: storage
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Go away!'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrive items'
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
  getOrdersOnCostBearer,
  getInventory
}
