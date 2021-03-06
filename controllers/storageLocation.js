'use strict'

const storageLocations = require('../models/storageLocation')
const userRoles = require('../models/userrole')

const addStorageLocation = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
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
        await storageLocations.StorageLocation.create({
          storageName: req.body.storageName,
          description: theDescription
        })
        res.json({
          success: true,
          message: 'Storage Location added'
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

const getStorageLocations = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseCustomerAccess(req)
    if (hasAccess) {
      const locations = await storageLocations.StorageLocation.findAll()
      return res.json({
        success: true,
        data: locations
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

const getStorageLocationById = async (req, res) => {
  try {
    const hasAccess = await userRoles.hasWarehouseWorkerAccess(req)
    if (hasAccess) {
      const theLocation = await storageLocations.StorageLocation.findOne({
        where: { id: req.params.storageLocationId }
      })
      if (theLocation) {
        res.json({
          success: true,
          data: theLocation
        })
      } else {
        res.json({
          success: false,
          message: 'No such id'
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

module.exports = {
  addStorageLocation,
  getStorageLocations,
  getStorageLocationById
}
