const Sequelize = require('sequelize')
const dbc = require('../config/database')
const TreasureHunt = require('./treasurehuntModel').TreasureHunt

const Checkpoint = dbc.define('Checkpoints', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  location: Sequelize.TEXT
})

TreasureHunt.hasMany(Checkpoint, {
  as: 'Asdasd'
})

/*
Checkpoint.belongsToMany(TreasureHunt, {
  through: {
    model: Checkpoint,
    unique: false
  },
  foreignKey: 'id',
  as: 'TreasureCheckpoint',
  constraints: false
})*/

module.exports = {
  Checkpoint
}
