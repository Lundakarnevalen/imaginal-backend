'use strict'

const storageLocations = require('../models/storagelocation')
const storageContents = require('../models/storagecontents')

const addStorageLocation = function (req, res) {
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

const getItemsInStorageLocation = async (req, res) => {
  const storage = await storageContents.StorageContent.findAll({
    where: { locationID: req.params.locationId  }
  })
  if (storage.length > 0) {
    return res.json({
      success: true,
      message: storage
    })
  } else {
    return res.status(400).json({
      success: false,
      message:'No items in storage location'
    })
  }
}

module.exports = {
  addStorageLocation,
  getItemsInStorageLocation
}
