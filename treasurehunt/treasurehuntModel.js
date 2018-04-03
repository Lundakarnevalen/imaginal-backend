const Sequelize = require('sequelize')
const dbc = require('../config/database')

const TreasureHunt = dbc.define('TreasureHunt', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: Sequelize.TEXT,
  open: Sequelize.INTEGER,
  closes: Sequelize.INTEGER
})

const getAllTreasureHunts = async () => {
  try {
    const allTH = await TreasureHunt.findAndCountAll()
    const rows = allTH['rows'].map(async (th)  => {
      const checkpoints = await th.getCheckpoints().map(cp => cp.id)
      const info = {
        TreasureHunt: th.id,
        checkpoints
      }
      return info
    })
    const result = await Promise.all(rows)
    return result
  } catch (e) {
    return { success: false,
    message: 'Failed to list TreasureHunts'
  }
}

module.exports = {
  TreasureHunt,
  getAllTreasureHunts
}
