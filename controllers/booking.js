const { Event } = require("../models/event");
const { Booking } = require("../models/booking");

const create = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id, {include:{model: Booking}})
    const remainingSeats = await event.getRemainingSeats();
    if(remainingSeats < req.body.nbrGuests){
      throw new Error('Not enough remaining seats')
    }
    let booking = Booking.build(req.body)
    booking.EventId = event.id
    // booking.setEvent(event)
    booking = await booking.save()
    res.json({ success: true, booking });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

module.exports = {
  create,
}