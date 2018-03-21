'use strict'

const storageLocations = require('../models/storagelocation')

const addStorageLocation = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  const existingLocation = await locations.filter(location => location.storageName === req.body.storageName)
  if (existingLocation.length > 0) {
    res.json({
      success: false,
      message: 'Storage Location already exists'
    })
  }
  else {
    //Check if create succeeds.
    await storageLocations.StorageLocation.create({
      storageName: req.body.storageName
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

//skeleton for editing storage location
const editStorageLocation = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  const existingLocation = await locations.filter(location => location.storageName === req.body.storageName)
  if (existingLocation.length == 0) {
    res.json({
      success: false,
      message: 'Storage Location does not exist'
    })
  }
  else {
    //Add code for editing
    res.json({
      success: true,
      message: 'Storage Location edited'
    })
  }
}

module.exports = {
  addStorageLocation,
  //editStorageLocation,
  getStorageLocations
}
