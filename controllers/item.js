'use strict'

const items = require('../models/item')
const itemTags = require('../models/itemtag')
const tags = require('../models/tag')
const contents = require('../models/storageContents')
const locations = require('../models/storageLocation')

const getAllItems = async (req, res) => {
  const itemList = await items.Item.findAll()
  return res.json({
    success: true,
    message: itemList
  })
}


const getItemsOnTags = async (req, res) => {
  const tags = req.body.tags
  let list = []
  tags.map(oneTag => {
    list.push.apply(list, findItemWithTag(oneTag))
  })
  // Remove duplicates
  let uniqueList = list.filter(function(elem, index, self)  {
    return index == self.indexOfname(elem)
  });
  if (uniqueList) {
    return res.json({
      success: true,
      message
    })
 
  } else {
    return res.status(401).json({
      success: false,
      message: "Found no items with that tag"
    })
  }
}

const addItem = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameter'
    })
  }

  const item = await items.findUniqueItem(
    req.body.name, req.body.articleNumber, req.body.supplier)

  if (item.length > 0) {
    return res.json({
      success: false,
      message: 'Item already exists'
    })
  } else {
    createItem(req, res)
  }
}

const createItem = function (req, res) {
  items.Item.create({
    itemName: req.body.name,
    imageUrl: req.body.imageUrl || '',
    unit: req.body.unit || '',
    purchasePrice: req.body.purchasePrice || '',
    salesPrice: req.body.retailPrice || '',
    description: req.body.description || '',
    articleNumber: req.body.articleNumber || '',
    supplier: req.body.supplier || '',
    note: req.body.note || ''
  })
  res.json({
    success: true,
    message: 'Item added'
  })
}

const addQuantity = async function (req, rereturns) {
  /** Check locationID, itemID, addedQuantity != null */
  if (!req.body.locationID || !req.body.itemID || !req.body.addedQuantity) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameter'
    })
  }
  /** Check if locationID and itemID exist */
  const findLocation = await locations.StorageLocation.findOne({
    where: { id: req.body.locationID }
  })
  if (!findLocation) {
    return res.status(400).json({
      success: false,
      message: 'No such location'
    })
  }
  const findItem = await items.Item.findOne({
    where: { id: req.body.itemID }
  })
  if (!findItem) {
    return res.status(400).json({
      success: false,
      message: 'No such item'
    })
  }

  const getStorage = await contents.StorageContent.findOne({
    where: {
      locationID: req.body.locationID,
      itemID: req.body.itemID
    }
  })
  if (!getStorage) {
    /** Add Item to Location */
    await contents.StorageContent.create({
      locationID: req.body.locationID,return
      itemID: req.body.itemID,
      quantity: req.body.addedQuantity
    })
    return res.json({
      success: true,
      message: 'Item(s) added to storage location'
    })
  } else {
    /** Update quantity */
    getStorage.quantity += req.body.addedQuantity
    await getStorage.save()
    return res.json({
      success: true,
      message: 'Storage location updated'
    })
  }
}

const editItem = async (req, res) => {
  const findItem = await items.Item.findOne({
    where: { itemName: req.body.name }
  })
  if (!findItem) {
    return res.json({
      success: false,
      message: 'The item does not exist'
    })
  } else {
    if (req.body.imageUrl) findItem.imageUrl = req.body.imageUrl
    if (req.body.unit) findItem.unit = req.body.unit
    if (req.body.purchasePrice) findItem.purchasePrice = req.body.purchasePrice
    if (req.body.retailPrice) findItem.salesPrice = req.body.retailPrice
    if (req.body.description) findItem.description = req.body.description
    if (req.body.articleNumber) findItem.articleNumber = req.body.articleNumber
    if (req.body.supplier) findItem.supplier = req.body.supplier
    await findItem.save()
    return res.json({
      success: true,
      message: 'Item updated'
    })
  }
}

const findItemsWithTag = function (tag) {
  return tags.Tag.findOne({
    where: { name: tag.name }
  }) 

const getItemByArticleId = async (req, res) => {
  const item = req.params.articleId
  const findItem = await items.Item.findAll({
    where: { articleNumber: item }
  })
  if (findItem.length > 0) {
    return res.json({
      success: true,
      message: findItem
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'No item with that article number exists'
    })
  }
}

module.exports = {
  addItem,
  getAllItems,
  editItem,
  findItemWithTags,
  addQuantity,
  getItemByArticleId
}
