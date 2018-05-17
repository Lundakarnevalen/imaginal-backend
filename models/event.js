const Sequelize = require('sequelize')
const dbc = require('../config/database')
const { Booking } = require('./booking')
const { EventTimeslot } = require('./eventTimeslot')

const Event = dbc.define('Event', {
  name: Sequelize.STRING,
  // date: Sequelize.DATEONLY,
  startDateTime: Sequelize.DATE,
  // endTime: Sequelize.TIME,
  nbrSeats: Sequelize.INTEGER
})
// Booking.belongsTo(Event)
// Event.hasMany(Booking)
Event.hasMany(EventTimeslot, {onDelete: 'cascade', hooks: true})
Booking.belongsTo(EventTimeslot)
EventTimeslot.belongsTo(Event)
EventTimeslot.hasMany(Booking)

module.exports = {
  Event
}
