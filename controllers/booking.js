const { Event } = require('../models/event')
const { Booking } = require('../models/booking')
const { EventTimeslot } = require('../models/eventTimeslot')
const { hasEventAdminAccess } = require('../models/userrole')

const create = async (req, res, opts) => {
  try {
    if (
      (req.body.nbrGuests < 1 || req.body.nbrGuests > 8) &&
    opts && opts.public
    ) {
      return res.json({
        success: false,
        message: 'Only 1-8 persons allowed in a booking'
      })
    }
    if (
      (req.body.nbrGuests < 1 || req.body.nbrGuests > 8) &&
      !(opts && opts.public) && !(await _hasEventAdminAccess(req, res, 'Only 1-8 persons allowed in a booking'))
    ) return
    const eventTimeslot = await EventTimeslot.findById(req.params.id, {
      include: [{ model: Booking }, { model: Event }]
    })
    const remainingSeats = await eventTimeslot.getRemainingSeats()
    if (remainingSeats < req.body.nbrGuests) {
      return res.json({ success: false, message: 'Not enough remaining seats' })
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
    if (!(await _hasEventAdminAccess(req, res))) return
    const bookings = await Booking.findAll({
      where: { eventTimeslotId: req.params.id }
    })
    res.json({ success: true, bookings })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}
const show = async (req, res, opts) => {
  try {
    let booking
    if (opts && opts.uuid) {
      booking = await Booking.findOne({
        where: { uuid: req.params.id },
        include: { model: EventTimeslot, include: { model: Event } }
      })
    } else {
      if (!(await _hasEventAdminAccess(req, res))) return
      booking = await Booking.findById(req.params.id, {
        include: { model: EventTimeslot, include: { model: Event } }
      })
    }
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
    if (!(await _hasEventAdminAccess(req, res))) return
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
const remove = async (req, res, opts) => {
  try {
    let booking
    if (opts && opts.uuid) {
      booking = await Booking.findOne({ where: { uuid: req.params.id } })
    } else {
      if (!(await _hasEventAdminAccess(req, res))) return
      booking = await Booking.findById(req.params.id)
    }
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

const _hasEventAdminAccess = async (req, res, msg) => {
  const hasAccess = await hasEventAdminAccess(req)
  if (!hasAccess) {
    res.status(401).json({
      success: false,
      message: msg || 'Unauthorized'
    })
  }
  return hasAccess
}

module.exports = {
  create,
  list,
  show,
  update,
  remove
}
