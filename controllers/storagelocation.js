'use strict'

const storageLocations = require('../models/storagelocation')

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

// const updateStorageLocation = async (req, res) => {
//   const locations = await storageLocations.StorageLocation.findAll()
//   const theLocation = await locations.find(location => location.id === req.body.id)
//   if (!theLocation) {
//     res.json({
//       success: false,
//       message: 'Storage Location does not exist'
//     })
//   } else {
//     if (req.body.storageName) {
//       theLocation.storageName = req.body.storageName //await?
//     }
//     if (req.body.description) {
//       theLocation.description = req.body.description
//     }
//     //add code for updating
//     //should we return the replaced fields?
//     //How to update updatedAt?
//     await theLocation.save()
//     res.json({
//       success: true,
//       message: 'Storage Location updated'
//     })
//   }
// }

module.exports = {
  addStorageLocation,
  // updateStorageLocation,
  getStorageLocations,
  getByID
}
