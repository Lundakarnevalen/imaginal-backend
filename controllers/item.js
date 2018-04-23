'use strict'

const tags = require('../models/tag')
const items = require('../models/item')
const itemTags = require('../models/itemtag')
const userRoles = require('../models/userrole')
const storageContents = require('../models/storageContents')
const storageLocations = require('../models/storageLocation')

const getAllItems = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrive items'
    })
  }
}

const addItem = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
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
        return res.status(400).json({
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to add items'
    })
  }
}

const createItem = async (req, res) => {
  const item = await items.Item.findCreateFind({
    where: {
      name: req.body.name,
      imageUrl: req.body.imageUrl || '',
      unit: req.body.unit || '',
      purchasePrice: req.body.purchasePrice || null,
      salesPrice: req.body.retailPrice || null,
      description: req.body.description || '',
      articleNumber: req.body.articleNumber || null,
      supplier: req.body.supplier || '',
      note: req.body.note || '',
      warningAmount: req.body.warningAmount || 1,
      vat: req.body.vat || 0
    }
  })

  if (req.body.tags) {
    req.body.tags.map(tag => {
      itemTags.ItemTag.create({
        tagId: tag,
        itemId: item[0].dataValues.id
      })
    })
  }

  return res.json({
    success: true,
    message: 'Item added'
  })
}

const addQuantity = async (req, res) => {
  /** Check locationID, itemID, addedQuantity != null */
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      if (!req.body.storageContentId || !req.body.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parameter'
        })
      }
      /** Check if locationID and itemID exist */
      const storageContent = await storageContents.StorageContent.findOne({
        where: { id: req.body.storageContentId }
      })
      if (!storageContent) {
        return res.status(400).json({
          success: false,
          message: 'No such storage content'
        })
      }
      storageContents.StorageContent.update({ quantity: storageContent.dataValues.quanity + req.body.quantiy },
        { where: { id: storageContent.dataValues.id } })
      return res.json({
        success: true,
        message: 'Quantity added to storage content'
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
      message: 'Something went horribly wrong!'
    })
  }
}

const addToStorageContent = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      console.log('-------------------')
      console.log(req.body)
      if (!req.body.storageLocationId || !req.body.itemId || !req.body.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parameters'
        })
      }
      const item = await items.Item.findOne({
        where: { id: req.body.itemId }
      })

      if (!item) {
        return res.status(400).json({
          success: false,
          message: 'No such item!'
        })
      }
      const storageLocation = await storageLocations.StorageLocation.findOne({
        where: { id: req.body.storageLocationId }
      })
      console.log('----------------')
      console.log(storageLocation)
      if (!storageLocation) {
        return res.status(400).json({
          success: false,
          message: 'No such storageLocation!'
        })
      }

      storageContents.StorageContent.create({
        storageLocationId: req.body.storageLocationId,
        itemId: req.body.itemId,
        quantity: req.body.quantity
      })
      return res.json({
        success: true,
        message: 'Item added to stroageContent with specified quantity'
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

const editItem = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseAdminAccess(req)
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
        if (req.body.name) findItem.name = req.body.name
        if (req.body.imageUrl) findItem.imageUrl = req.body.imageUrl
        if (req.body.unit) findItem.unit = req.body.unit
        if (req.body.purchasePrice) findItem.purchasePrice = req.body.purchasePrice
        if (req.body.retailPrice) findItem.salesPrice = req.body.retailPrice
        if (req.body.description) findItem.description = req.body.description
        if (req.body.articleNumber) findItem.articleNumber = req.body.articleNumber
        if (req.body.supplier) findItem.supplier = req.body.supplier
        if (req.body.note) findItem.note = req.body.note
        if (req.body.warningAmount) findItem.warningAmount = req.body.warningAmount
        if (req.body.vat) findItem.vat = req.body.vat
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrive items'
    })
  }
}

// Gest list of Ids to get items from
const getItemsOnTags = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const reqTags = req.body.tags
      const tagIds = reqTags.map(tag => tag.id)
      const itemList = await tags.Tag.findOne({
        include: [{
          model: items.Item,
          through: {
            where: { tagId: tagIds }
          }
        }]
      })
      if (itemList.Items.length > 0) {
        return res.json({
          success: true,
          data: itemList.Items
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrive items'
    })
  }
}

const getItemById = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
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
        const itemList = await items.Item.findOne({
          include: [{
            model: tags.Tag,
            through: {
              where: { itemId: findItem.id }
            }
          }]
        })

        if (itemList.Tags.length > 0) {
          findItem.dataValues.tags = itemList.Tags
        }
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
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrive items'
    })
  }
}

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
  getItemsOnTags,
  getItemById,
  addQuantity,
  addToStorageContent,
  getItemByArticleId
}
