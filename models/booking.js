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
  }
})

Booking.associate = (models) => {
  Booking.belongsTo(models.Event)
}

module.exports = {
  Booking
}
