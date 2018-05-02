const Sequelize = require('sequelize')
const dbc = require('../config/database')
const { Booking } = require('./booking')

const Event = dbc.define('Event', {
  name: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  startTime: Sequelize.TIME,
  nbrSeats: Sequelize.INTEGER
})
// const Booking = dbc.define('Booking', {
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
//   phoneNbr: Sequelize.STRING,
//   nbrGuests: Sequelize.INTEGER
// })
Booking.belongsTo(Event)
Event.hasMany(Booking)

Event.prototype.getRemainingSeats = async function () {
  let bookings
  if (!this.Bookings) {
    bookings = await this.getBookings()
  } else {
    bookings = this.Bookings
  }
  return this.nbrSeats - bookings.reduce((sum, booking) => (sum += booking.nbrGuests), 0)
}

module.exports = {
  Event
}
