const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User

const WarehouseUser = dbc.define('WarehouseUser', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  costBearerId: {
    type: Sequelize.INTEGER
  }
})

const CostBearer = dbc.define('CostBearer', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  }
})

WarehouseUser.hasOne(User, { as: 'User', foreignKey: 'userId' })
WarehouseUser.hasOne(CostBearer)

const getWarehouseUsers = async(req, res) =>  {
  return WarehouseUser.findAll()
}
module.exports = {
  WarehouseUser,
  CostBearer,
  getWarehouseUsers
}
