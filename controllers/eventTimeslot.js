// const { Event } = require('../models/event')
const { Booking } = require('../models/booking')
const { EventTimeslot } = require('../models/eventTimeslot')
const { hasEventAdminAccess } = require('../models/userrole')

const list = async (req, res) => {
  try {
    let allEventTimeslots = await EventTimeslot.findAll({
      where: { eventId: req.params.eventId }
    })
    allEventTimeslots = await Promise.all(
      allEventTimeslots.map(async timeslot => {
        timeslot.dataValues.nbrRemainingSeats = await timeslot.getRemainingSeats()
        return timeslot
      })
    )
    res.json({
      success: true,
      timeslots: allEventTimeslots
    })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const show = async (req, res) => {
  try {
    if (!(await _hasEventAdminAccess(req, res))) return
    const evenTimeslot = await EventTimeslot.findById(req.params.id, {
      include: { model: Booking }
    })
    if (evenTimeslot) {
      evenTimeslot.dataValues.nbrRemainingSeats = await evenTimeslot.getRemainingSeats()
      res.json({ success: true, evenTimeslot })
    } else {
      res.json({ success: false, message: 'No such event time slot' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const create = async (req, res) => {
  try {
    if (!(await _hasEventAdminAccess(req, res))) return
    let eventTimeslot = EventTimeslot.build(req.body)
    eventTimeslot.EventId = req.params.eventId
    eventTimeslot = await eventTimeslot.save()
    res.json({ success: true, eventTimeslot })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const update = async (req, res) => {
  try {
    if (!(await _hasEventAdminAccess(req, res))) return
    let eventTimeslot = await EventTimeslot.findById(req.params.id)
    if (eventTimeslot) {
      eventTimeslot = await eventTimeslot.update(req.body)
      res.json({ success: true, eventTimeslot })
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
    let eventTimeslot = await EventTimeslot.findById(req.params.id)
    if (eventTimeslot) {
      eventTimeslot = await eventTimeslot.destroy()
      res.json({ success: true, eventTimeslot })
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
