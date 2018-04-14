'use strict'

const orders = require('../models/order')
const orderlines = require('../models/orderline')

const createOrder = async (req, res) => {
    if ((!req.body.storageLocationID || !req.body.warehouseUserID || !req.body.orderlines)
        || !(await req.body.orderlines.every(body => body.itemID && body.quantity)))
        return res.json({
            success: false,
            message: "Missing parameters"
        })
    else {
        const order = await orders.Order.create({
            storageLocationID: req.body.storageLocationID,
            warehouseUserID: req.body.warehouseUserID,
            delivered: false,
            return: req.body.return || false
        })
        await req.body.orderlines.forEach(body => createOrderLine(order, body))
        return res.json({
            success: true,
            message: "Order created"
        })

    }
}

const createOrderLine = (order, body) => {
    orderlines.OrderLine.create({
        quantityOrdered: body.quantity,
        quantityDelivered: 0,
        orderID: order.id,
        itemID: body.itemID
    })
}

const removeOrder = async (req, res) => {
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
    else {
        //check if destroy is successful?
        await orderlines.OrderLine.destroy({ where: { orderID: req.body.id } })
        await orders.Order.destroy({ where: { id: req.body.id } })
        return res.json({
            success: true,
            message: "Order removed"
        })
    }
}

const findOrder = (orderID) => {
    return orders.Order.findById(orderID)
    //return orderlines associated with order?
}

const editOrder = async (req, res) => {
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
        if (req.body.delivered != null) {
            theOrder.delivered = req.body.delivered
            theOrder.deliveryDate = (req.body.delivered) ? new Date() : null         
        }
        if (req.body.return != null)
            theOrder.return = req.body.return
        await theOrder.save()
        return res.json({
            success: true,
            message: "Order edited"
        })
    }
}

const getAllOrders = async (req, res) => {
    const allOrders = await orders.Order.findAll()
    return res.json({
        success: true,
        allOrders
    })
}

const getOrdersOnUser = async (req, res) => {
    const theOrders = await orders.Order.findAll({
        where: {warehouseUserID: req.body.warehouseUserID}
    })
    if(theOrders.length > 0)
    return res.json({
        success: true,
        theOrders
    })
    else
    return res.json({
        success: false,
        message: "No orders on that user"
    })
}

const getOrdersOnSection = async (req, res) => {
    const theOrders = await orders.Order.findAll({
        where: {storageLocationID: req.body.storageLocationID}
    })
    if(theOrders.length > 0)
    return res.json({
        success: true,
        theOrders
    })
    else
    return res.json({
        success: false,
        message: "No orders on that section"
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    editOrder,
    removeOrder
}