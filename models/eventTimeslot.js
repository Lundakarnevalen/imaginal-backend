const Sequelize = require('sequelize')
const dbc = require('../config/database')

const EventTimeslot = dbc.define('EventTimeslot', {
  startDateTime: Sequelize.TIME,
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 120
  },
  guestDuration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 105
  }
})

EventTimeslot.prototype.getRemainingSeats = async function () {
  let bookings, nbrSeats
  if (!this.Bookings) {
    bookings = await this.getBookings()
  } else {
    bookings = this.Bookings
  }
  if (!this.Event) {
    nbrSeats = (await this.getEvent()).nbrSeats
  } else {
    nbrSeats = this.Event.nbrSeats
  }
  return (
    nbrSeats - bookings.reduce((sum, booking) => (sum += booking.nbrGuests), 0)
  )
}

module.exports = { EventTimeslot }
