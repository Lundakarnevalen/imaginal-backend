const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Booking = dbc.define('Booking', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: Sequelize.STRING,
  phoneNbr: Sequelize.STRING,
  nbrGuests: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  foodPreference: Sequelize.TEXT,
  specialRequest: Sequelize.TEXT,
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  }
})

module.exports = {
  Booking
}
