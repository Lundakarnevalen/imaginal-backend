'use strict'

const userRoles = require('../models/userrole')
const warehouseUser = require('../models/warehouseUser')


const getWarehouseUsers = async(req, res) =>  {
  return WarehouseUser.findAll()
}

module.exports = {
  addTag,
  getAllTags,
  removeTag
}
