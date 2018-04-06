const Sequelize = require('sequelize')
const dbc = require('../config/database')

const TreasureHunt = dbc.define('TreasureHunt', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.TEXT,
  isRunning: Sequelize.BOOLEAN
})

const getAllTreasureHunts = async () => {
  try {
    const allTH = await TreasureHunt.findAndCountAll()
    const rows = allTH['rows'].map(async (th) => {
      const info = await getTreasureHuntInfo(th)
      return info
    })
    const result = await Promise.all(rows)
    return result
  } catch (e) {
    return {
      success: false,
      message: 'Failed to list TreasureHunts'
    }
  }
}

const getTreasureHuntInfo = async (treasure) => {
  'use strict'
  const checkpoints = await treasure.getCheckpoints().map(cp => cp.id)
  const info = {
    TreasureHunt: treasure.id,
    isRunning: treasure.isRunning,
    checkpoints
  }
  return info
}

module.exports = {
  TreasureHunt,
  getTreasureHuntInfo,
  getAllTreasureHunts
}
