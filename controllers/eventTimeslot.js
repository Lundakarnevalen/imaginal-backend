// const { Event } = require('../models/event')
const { Booking } = require('../models/booking')
const { EventTimeslot } = require('../models/eventTimeslot')

const list = async (req, res) => {
  try {
    let allEventTimeslots = await EventTimeslot.findAll({
      where: { eventId: req.params.eventId },
      include: { model: Booking }
    })
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
    const evenTimeslot = await EventTimeslot.findById(req.params.id, {
      include: { model: Booking }
    })
    if (evenTimeslot) {
      // evenTimeslot.dataValues.nbrRemainingSeats = await evenTimeslot.getRemainingSeats()
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

module.exports = {
  list,
  show,
  create,
  update,
  remove
}
