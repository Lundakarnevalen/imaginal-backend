const dbc = require("../config/database");
const Sequelize = require("sequelize");

const TreasureHunt = dbc.define("TreasureHunt", {
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
});

const info = async () => {
  const players = await TreasureHunt.findAndCountAll()
  const winners = await TreasureHunt.findAndCountAll({
    where: { finished: true }
  })
  return { players: players.count, winnersLeft: 25 - winners.count };
};

const enroll = async user => {
  if (!await TreasureHunt.findOne({ where: { contestant: user.email } })) {
    return TreasureHunt.create({
      contestant: user.email,
      finished: false
    });
  }
};

module.exports = {
  enroll,
  info
};
