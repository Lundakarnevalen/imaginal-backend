const { Event } = require('../models/event')
const { Booking } = require('../models/booking')

const create = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, {include: {model: Booking}})
    const remainingSeats = await event.getRemainingSeats()
    if (remainingSeats < req.body.nbrGuests) {
      throw new Error('Not enough remaining seats')
    }
    let booking = Booking.build(req.body)
    booking.EventId = event.id
    // booking.setEvent(event)
    booking = await booking.save()
    res.json({ success: true, booking })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const list = async (req, res) => {
  try {
    const bookings = await Booking.all()
    res.json({success: true, bookings})
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
const show = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id, {include: {model: Event}})
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
