const Sequelize = require('sequelize')
const dbc = require('../config/database')
const TreasureHunt = require('./treasurehuntModel').TreasureHunt

const Checkpoint = dbc.define('Checkpoints', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  locationX: Sequelize.TEXT,
  locationY: Sequelize.TEXT,
  TreasureHuntId: Sequelize.INTEGER
})

TreasureHunt.hasMany(Checkpoint, {
  as: 'Checkpoints'
})

Checkpoint.belongsTo(TreasureHunt, {
  as: 'TreasureHunt',
  foreignKey: 'TreasureHuntId'
})

module.exports = {
  Checkpoint
}
