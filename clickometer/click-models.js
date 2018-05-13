const Sequelize = require('sequelize')
const dbc = require('../config/database')

// Events
// For example: Dansen friday, Södersken lördag.
const Event = dbc.define('click_events', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING, defaultValue: '' }
})

// Create calendar model
const Room = dbc.define('click_room', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING, defaultValue: '' },
  max_guests: { type: Sequelize.INTEGER },
  current_guests: { type: Sequelize.INTEGER, defaultValue: 0 }
})

// Create Connection model
const Connection = dbc.define('click_connection', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING, defaultValue: '' },
  current_token: { type: Sequelize.STRING, defaultValue: '' },
  prev_token: { type: Sequelize.STRING, defaultValue: '' },
  current_clicker: { type: Sequelize.STRING, defaultValue: '' },
  guests_passed: { type: Sequelize.INTEGER, defaultValue: 0 }
})

// Create log model
const Log = dbc.define('click_log', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ipadress: {
    type: Sequelize.STRING
  },
  timestamp: {
    type: Sequelize.DATE
  },
  eventType: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }
})

Room.belongsTo(Event, {as: 'event'})
Connection.belongsTo(Event, {as: 'event'})
Log.belongsTo(Event, {as: 'event'})
Connection.belongsTo(Room, {as: 'to_room'})
Connection.belongsTo(Room, {as: 'from_room'})
module.exports = {
  Event,
  Room,
  Connection,
  Log
}
