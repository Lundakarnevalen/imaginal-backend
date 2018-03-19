'use strict'

const storageLocations = require('../models/storagelocation')

const addStorageLocation = function (req, res) {
  storageLocations.StorageLocation.findAll()
  .then((storageLocations) => {
    storageLocations.forEach((location) => {
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

module.exports = {
  addStorageLocation
}
