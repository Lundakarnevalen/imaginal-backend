'use strict'

const storageLocations = require('../models/storageLocation')
const storageContents = require('../models/storageContents')
const userRoles = require('../models/userrole')
const items = require('../models/item')

const addStorageLocation = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  const existingLocation = await locations.find(location => location.storageName === req.body.storageName)
  if (existingLocation) {
    res.json({
      success: false,
      message: 'Storage Location already exists'
    })
  } else if (!req.body.storageName) {
    res.json({
      success: false,
      message: 'Missing parameter storageName'
    })
  } else {
    const theDescription = (req.body.description) ? req.body.description : ''
    // Check if create succeeds?
    await storageLocations.StorageLocation.create({
      storageName: req.body.storageName,
      description: theDescription
    })
    res.json({
      success: true,
      message: 'Storage Location added'
    })
  }
}

const getStorageLocations = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  return res.json({
    success: true,
    locations: locations
  })
}

const getByID = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  const theLocation = await locations.find(location => location.id === req.body.id)
  if (theLocation) {
    res.json({
      success: true,
      location: theLocation
    })
  } else {
    res.json({
      success: false,
      message: 'No such ID'
    })
  }
}

const getInventory = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const storageLocationId = req.body.storageLocationId
      const locationExists = await storageLocations.StorageLocation.findOne({
        where: { id: storageLocationId }
      })
      if (!locationExists) {
        return res.status(400).json({
          success: false,
          message: 'Location does not exist'
        })
      }
      const storage = await storageContents.StorageContent.findAll({
        include: [{
          model: items.Item,
          through: {
            where: { locationID: storageLocationId }
          }
        }]
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
  addStorageLocation,
  getStorageLocations,
  getByID,
  getInventory
}
