const moment = require('moment')
const { Event } = require('../models/event')
const { EventTimeslot } = require('../models/eventTimeslot')
const { hasEventAdminAccess } = require('../models/userrole')

const list = async (req, res) => {
  try {
    let allEvents = await Event.all({ include: { model: EventTimeslot } })
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
      event.EventTimeslots = await Promise.all(
        event.EventTimeslots.map(
          async timeslot =>
            (timeslot.dataValues.nbrRemainingSeats = await timeslot.getRemainingSeats())
        )
      )
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
    if (!(await _hasEventAdminAccess(req, res))) return
    const nbrTimeslots = req.body.nbrTimeslots
    if (!nbrTimeslots || nbrTimeslots === 0) {
      throw Error('Not allowed to create an event without any timeslots')
    }
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
    if (!(await _hasEventAdminAccess(req, res))) return
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
    if (!(await _hasEventAdminAccess(req, res))) return
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

const _hasEventAdminAccess = async (req, res) => {
  const hasAccess = await hasEventAdminAccess(req)
  if (!hasAccess) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  return hasAccess
}

module.exports = {
  list,
  show,
  create,
  update,
  remove
}
