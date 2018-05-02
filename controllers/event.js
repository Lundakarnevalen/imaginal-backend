const { Event } = require("../models/event");
const {Booking} = require('../models/booking')

const getAll = async (req, res) => {
  try {
    let allEvents = await Event.findAll({include: {model: Booking}})
    let allEvents2 = await Promise.all(allEvents.map(async event => {
      event.dataValues.nbrRemainingSeats = await event.getRemainingSeats()
      delete event.dataValues.Bookings
      return event
    }))
    res.json({
      success: true,
      events: allEvents2
    })
  } catch (e) {
    res.json({success: false, message: e.message })
  }
}

const getById = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id, {include: {model: Booking}})
    if (event) {
      event.dataValues.nbrRemainingSeats = await event.getRemainingSeats()
      res.json({success: true, event})
    } else {
      res.json({success: false, message: 'No such event'})
    }
  } catch (e) {
    res.json({success: false, message: e.message})
  }
}

const create = async(req, res) => {
  try {
    const event = await Event.create(req.body)
    res.json({success: true, event})
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const update = async(req, res) => {
  try {
    const [affected] = await Event.update(req.body, {where: {id: req.params.id}})
    if (affected === 1) {
      res.json({ success: true })
    } else if (affected === 0) {
      res.json({ success: false, message: 'No such element' })
    } else {
      res.json({
        success: false,
        message:
          'More then one event was updated. Something has gone terribly wrong.'
      })
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const remove = async(req, res) => {
  try {
    const affected = await Event.destroy({where: {id: req.params.id}})
    if (affected === 1) {
      res.json({success: true})
    } else if (affected === 0) {
      res.json({success: false, message: 'No such element'})
    } else {
      res.json({success: false, message: 'More then one event was delete. Something has gone terribly wrong.'})
    }
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
