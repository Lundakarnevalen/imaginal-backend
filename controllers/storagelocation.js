'use strict'

const storageLocations = require('../models/storagelocation')

const addStorageLocation = async (req, res) => {
  storageLocations.StorageLocation.findAll()
    .then((locations) => {
      locations.forEach((location) => {
        if (location.storageName === req.body.storageName) {
          return res.json({
            success: false,
            message: 'Location already exists'
          })
        }
      })
      storageLocations.StorageLocation.create({
        storageName: req.body.storageName
      }).then(() => {
        res.json({
          success: true,
          message: 'Storage Location added'
        })
      })
    })
}

const getStorageLocations = async (req, res) => {
  const locations = await storageLocations.StorageLocation.findAll()
  return res.json({
    success: true,
    locations: locations
  })
}

//skeleton for editing storage location
const editStorageLocation = function (req, res) {
  storageLocations.StorageLocation.findAll()
    .then((locations) => {
      locations.forEach((location) => {
        if (location.storageName === req.body.storageName) {
          return res.json({
            success: true,
            message: 'Storage Location edited'
          })
        }
      })
      res.json({
        success: false,
        message: 'No such location exists'
      })
    })
}

module.exports = {
  addStorageLocation,
  //editStorageLocation,
  getStorageLocations
}
