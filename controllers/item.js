'use strict'

const items = require('../models/item')

const getAllItems = async (res, req) => {
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
    await createItem(req, res) /** Does await make sence here? */
  }
}

const createItem = async function (req, res) {
  await items.Item.create({
    itemName: req.body.itemName,
    imageUrl: req.body.imageUrl,
    unit: req.body.unit,
    amount: req.body.amount,
    pricePerUnit: req.body.pricePerUnit,
    storageLocation: req.body.storageLocation,
    description: req.body.description,
    creator: req.body.creator,
    weight: req.body.weight,
    measurements: req.body.measurements,
    category: req.body.category
  })
  res.json({
    sucess: true,
    message: 'Item ' + req.body.itemName + ' added'
  })
}

module.exports = {
  addItem
}
