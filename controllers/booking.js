const { Event } = require('../models/event')
const { Booking } = require('../models/booking')
const { EventTimeslot } = require('../models/eventTimeslot')

const create = async (req, res) => {
  try {
    const eventTimeslot = await EventTimeslot.findById(req.params.id, {
      include: [{ model: Booking }, { model: Event }]
    })
    const remainingSeats = await eventTimeslot.getRemainingSeats()
    if (remainingSeats < req.body.nbrGuests) {
      throw new Error('Not enough remaining seats')
    }
    let booking = Booking.build(req.body)
    booking.EventTimeslotId = eventTimeslot.id
    // booking.setEvent(eventTimeslot)
    booking = await booking.save()
    res.json({ success: true, booking })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const list = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { eventTimeslotId: req.params.id }
    })
    res.json({ success: true, bookings })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
const show = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id, {
      include: { model: EventTimeslot, include: {model: Event} }
    })
    if (booking) {
      res.json({ success: true, booking })
    } else {
      res.json({ success: false, message: 'No such booking' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
const update = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id)
    if (booking) {
      booking = await booking.update(req.body)
      res.json({ success: true, booking })
    } else {
      res.json({ success: false, message: 'No such booking' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
const remove = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id)
    if (booking) {
      booking = await booking.destroy()
      res.json({ success: true, booking })
    } else {
      res.json({ success: false, message: 'No such booking' })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
module.exports = {
  create,
  list,
  show,
  update,
  remove
}
