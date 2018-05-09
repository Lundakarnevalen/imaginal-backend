const { Event } = require('../models/event')
// const { Booking } = require('../models/booking')
const { EventTimeslot } = require('../models/eventTimeslot')
const moment = require('moment')

const list = async (req, res) => {
  try {
    let allEvents = await Event.all({ include: { model: EventTimeslot } })
    // allEvents = await Promise.all(allEvents.map(async event => {
    //   event.dataValues.nbrRemainingSeats = await event.getRemainingSeats()
    //   delete event.dataValues.Bookings
    //   return event
    // }))
    res.json({
      success: true,
      events: allEvents
    })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const show = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, {
      include: { model: EventTimeslot }
    })
    if (event) {
      // event.dataValues.nbrRemainingSeats = await event.getRemainingSeats()
      res.json({ success: true, event })
    } else {
      res.json({ success: false, message: 'No such event' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const create = async (req, res) => {
  try {
    const nbrTimeslots = req.body.nbrTimeslots
    if (!nbrTimeslots || nbrTimeslots === 0) { throw Error('Not allowed to create an event without any timeslots') }
    const event = await Event.create(req.body)
    let startDateTime = moment.utc(event.startDateTime)
    for (let i = 0; i < nbrTimeslots; i++) {
      const startDateTimeString = startDateTime.format('YYYY-MM-DD HH:mm:ss')
      const timeslot = await EventTimeslot.create({
        startDateTime: startDateTimeString,
        EventId: event.id
      })
      startDateTime.add(timeslot.duration, 'minutes')
    }
    res.json({ success: true, event })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const update = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id)
    if (event) {
      event = await event.update(req.body)
      res.json({ success: true, event })
    } else {
      res.json({ success: false, message: 'No such element' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const remove = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id)
    if (event) {
      event = await event.destroy()
      res.json({ success: true, event })
    } else {
      res.json({ success: false, message: 'No such element' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

module.exports = {
  list,
  show,
  create,
  update,
  remove
}
