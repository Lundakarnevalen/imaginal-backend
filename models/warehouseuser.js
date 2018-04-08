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

User.hasOne(CostBearer, {
  through: {
    model: WarehouseUser,
    unique: false
  },
  foreignKey: 'userId',
  constrains: false
})

CostBearer.hasMany(User, {
  through: {
    model: WarehouseUser,
    unique: false
  },
  foreignKey: 'costBearerId',
  constraints: false
})

module.exports = {
  WarehouseUser,
  CostBearer
}
