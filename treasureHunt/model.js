const dbc = require('../config/database')
const Sequelize = require('sequelize')

const TreasureHunt = dbc.define('TreasureHunt', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  contestant: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  finished: Sequelize.BOOLEAN
})

const info = async () => {
  const players = await TreasureHunt.findAndCountAll()
  const winnerCount = players.rows.filter(player => player.dataValues.finished).length
  return {players: players.count, winnersLeft: 25 - winnerCount}
}

const enroll = async user => {
  if (!await TreasureHunt.findOne({where: {contestant: user.email}})) {
    return TreasureHunt.create({
      contestant: user.email,
      finished: false
    })
  }
}

const win = async user => {
  const player = await TreasureHunt.find({where: {contestant: user.email}})
  player.finished = true
  player.save()
}

module.exports = {
  enroll,
  info,
  win
}
