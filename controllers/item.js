'use strict'

const tags = require('../models/tag')
const items = require('../models/item')
const itemTags = require('../models/itemtag')
const contents = require('../models/storageContents')
const locations = require('../models/storageLocation')
const userRoles = require('../models/userrole')

const getAllItems = async (req, res) => {
  const hasAccess = await userRoles.hasWarehouseCustomerAccess()
  if (hasAccess) {
    const itemList = await items.Item.findAll()
    return res.json({
      success: true,
      data: itemList
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const addItem = async (req, res) => {
  const hasAccess = await userRoles.hasWarehouseAdminAccess()
  if (hasAccess) {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameter'
      })
    }

    /** To do: Control that req.body.articleNumber and supplier are not empty! */
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
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const createItem = function (req, res) {
  items.Item.create({
    itemName: req.body.name,
    imageUrl: req.body.imageUrl || '',
    unit: req.body.unit || '',
    purchasePrice: req.body.purchasePrice || null,
    salesPrice: req.body.retailPrice || null,
    description: req.body.description || '',
    articleNumber: req.body.articleNumber || null,
    supplier: req.body.supplier || '',
    note: req.body.note || '',
    warningAmount: req.body.warningAmount || 1,
    VAT: req.body.vat || 0
  })

  req.body.tags.map(tag => {
    itemTags.ItemTag.create({
      name: tag.name
    })
  })

  res.json({
    success: true,
    message: 'Item added'
  })
}

const addItemsToLocation = async function (req, res) {
  /** Check locationID, itemID, addedQuantity != null */
  const hasAccess = await userRoles.hasWarehouseWorkerAccess()
  if (hasAccess) {
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
        locationID: req.body.locationID,
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
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const editItem = async (req, res) => {
  const hasAccess = await userRoles.hasWarehouseAdminAccess()
  if (hasAccess) {
    const findItem = await items.Item.findOne({
      where: { id: req.body.id }
    })
    if (!findItem) {
      return res.status(400).json({
        success: false,
        message: 'The item does not exist'
      })
    } else {
      if (req.body.name) findItem.itemName = req.body.name
      if (req.body.imageUrl) findItem.imageUrl = req.body.imageUrl
      if (req.body.unit) findItem.unit = req.body.unit
      if (req.body.purchasePrice) findItem.purchasePrice = req.body.purchasePrice
      if (req.body.retailPrice) findItem.salesPrice = req.body.retailPrice
      if (req.body.description) findItem.description = req.body.description
      if (req.body.articleNumber) findItem.articleNumber = req.body.articleNumber
      if (req.body.supplier) findItem.supplier = req.body.supplier
      if (req.body.note) findItem.note = req.body.note
      if (req.body.warningAmount) findItem.warningAmount = req.body.warningAmount
      await findItem.save()
      return res.json({
        success: true,
        message: 'Item updated'
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const getItemsOnTags = async (req, res) => {
  const hasAccess = await userRoles.hasWarehouseCustomerAccess()
  if (hasAccess) {
    const tags = req.body.tags
    let list = []

    tags.map(oneTag => {
      const itemList = itemTags.ItemTag.findAll({
        where: { name: oneTag.name }
      })
      if (itemList) {
        list.push.apply(list, itemList)
      }
    })
  // Remove duplicates
    let uniqueList = list.filter(function (elem, index, self) {
      return index === self.indexOfname(elem)
    })
    if (uniqueList) {
      return res.json({
        success: true,
        message: uniqueList
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Found no items with that tag'
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

const getItemById = async (req, res) => {
  const hasAccess = await userRoles.hasWarehouseCustomerAccess()
  if (hasAccess) {
    const findItem = await items.Item.findOne({
      where: { id: req.params.id }
    })

    if (!findItem) {
      return res.status(400).json({
        success: false,
        message: 'No item with that id exists'
      })
    } else {
      const findItemTag = await itemTags.ItemTag.findAll({
        where: {itemId: findItem.id}
      })
      let tagsList = []

      findItemTag.map(itemTag => {
        console.log(itemTag)
        console.log(itemTag.tagId)
        const findTag = tags.Tag.findOne({
          where: { id: itemTag.tagId }
        })
        console.log(findTag)
        console.log('VARFÖR FUNKAR INTE DETTA....')
        if (findTag) {
          tagsList.push(findTag)
        }
      })

      findItem.dataValues.tags = tagsList
      return res.json({
        success: true,
        data: findItem
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Go away!'
    })
  }
}

module.exports = {
  addItem,
  getAllItems,
  editItem,
  getItemsOnTags,
  addItemsToLocation,
  getItemById
}
