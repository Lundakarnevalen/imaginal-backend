'use strict'

const items = require('../models/item')

const getAllItems = async (req, res) => {
  const itemList = await items.Item.findAll().map(oneItem => {
    const list = {}
    list['itemName'] = oneItem.itemName
    return list
  })
  return res.json({
    sucess: true,
    message: itemList
  })
}

const addItem = async (req, res) => {
  if (!req.body.itemName) {
    return res.json({ /** Status? */
      success: false,
      message: 'Invalid parameter'
    })
  }

  const allItems = await items.Item.findAll()
  const itemExists = await allItems.filter(item => item.itemName === req.body.itemName)
  if (itemExists.length > 0) {
    return res.json({
      sucess: false,
      message: 'Item already exists'
    })
  }
  else {
    createItem(req, res)
  }
}

const createItem = function (req, res) {
  items.Item.create({
    itemName: req.body.itemName,
    imageUrl: req.body.imageUrl || '',
    unit: req.body.unit || '',
    purchasePrice: req.body.purchasePrice || '',
    salesPrice: req.body.salesPrice || '',
    description: req.body.description || '',
    articleNumber: req.body.articleNumber || '',
    supplier: req.body.supplier || ''
  })
  res.json({
    sucess: true,
    message: 'Item added'
  })
}

const editItem = async (req, res) => {
  const findItem = await items.Item.findOne({
    where: { itemName: req.body.itemName }
  })
  if (!findItem) {
    return res.json({
      sucess: false,
      message: 'The item does not exist'
    })
  }
  else {
    if (req.body.imageUrl) findItem.imageUrl = req.body.imageUrl
    if (req.body.unit) findItem.unit = req.body.unit
    if (req.body.purchasePrice) findItem.purchasePrice = req.body.purchasePrice
    if (req.body.salesPrice) findItem.salesPrice = req.body.salesPrice
    if (req.body.description) findItem.description = req.body.description
    if (req.body.articleNumber) findItem.articleNumber = req.body.articleNumber
    if (req.body.supplier) findItem.supplier = req.body.supplier
    await findItem.save()
    return res.json({
      sucess: true,
      message: 'Item updated'
    })
  }
}

module.exports = {
  addItem,
  getAllItems,
  editItem
}
