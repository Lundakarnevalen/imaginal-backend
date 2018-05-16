const database = require('./click-models')
const sequelize = database.sequelize
const Room = database.Room

module.exports = (app, isAdmin, log) => {
  /**
    * @swagger
    * definitions:
    *   Room:
    *     properties:
    *       name:
    *         type: string
    *         example: "Room A"
    *       description:
    *         type: string
    *         example: "My room"
    *       max_guests:
    *         type: number
    *         example: 170
    *       eventid:
    *         type: number
    *         example: 3
    * /api/click/rooms/:
    *   post:
    *     summary: Create a room
    *     description:
    *       Create a Room
    *     tags: [Room]
    *     parameters:
    *       - name: Room data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Room'
    *       - in: header
    *         name: Authorization
    *         schema:
    *           type: string
    *         description:
    *           Token to authenticate admin or viewer.
    *           Eg. "Authorization TlVTEfHtPR"
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.post('/api/click/rooms', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const room = req.body
    if (!room.name || !room.max_guests || !room.eventid) {
      return res.status(400).json({
        message: 'Missing parameter. Send name, max_guests, and event'
      })
    }
    Room.create({
      name: room.name,
      description: room.description,
      max_guests: room.max_guests
    }).then((r) => {
      r.setEvent(room.eventid)
      res.status(200).json({
        message: 'Successfully created room'
      })
    }).catch((err) => {
      res.status(500).json({ err })
    })
  })
  /**
    * @swagger
    * definitions:
    *   RoomList:
    *     type: array
    *     items: Room
    * /api/click/rooms/list/{eventid}:
    *   get:
    *     summary: Get list of all rooms for a event
    *     description:
    *       Get list of all Room for a specifik event
    *     tags: [Room]
    *     parameters:
    *       - name: eventid
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: List of all rooms
    *         schema:
    *           $ref: '#/definitions/RoomList'
    *       500:
    *         description: Internal server error
    */
  app.get('/api/click/rooms/list/:eventid', function (req, res) {
    Room.findAll({ where: { eventId: req.params.eventid } })
      .then(function (rooms) { res.status(200).json(rooms) })
      .catch(function (err) { res.status(500).json({ err }) })
  })
  /**
    * @swagger
    * definitions:
    *   RoomBulk:
    *     properties:
    *       from:
    *         type: number
    *         description: From roomId
    *         example: 2
    *       to:
    *         type: number
    *         description: To roomId
    *         example: 1
    *       count:
    *         type: number
    *         example: 500
    * /api/click/rooms/bulk:
    *   put:
    *     summary: Bulk move
    *     description:
    *       Bulk move people between two rooms
    *     tags: [Room]
    *     parameters:
    *       - name: Room Bulk
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/RoomBulk'
    *       - in: header
    *         name: Authorization
    *         schema:
    *           type: string
    *         description:
    *           Token to authenticate admin or viewer.
    *           Eg. "Authorization TlVTEfHtPR"
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.put('/api/click/rooms/bulk', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const bulk = req.body
    console.log(bulk)
    if (!bulk.from || !bulk.to || !bulk.count) {
      return res.status(400).json({
        message: 'Missing parameter. Send from, to and count'
      })
    }
    log(req, 'Room Bulk', `RoomBulk between ${bulk.from} to ${bulk.to}, count: ${bulk.count}`)
    Room.update({
      current_guests: sequelize.literal(`current_guests - ${bulk.count}`)
    }, {
      where: { id: bulk.from }
    }).then(function (result) {
      Room.update({
        current_guests: sequelize.literal(`current_guests + ${bulk.count}`)
      }, {
        where: { id: bulk.to }
      }).then(function (result) {
        res.status(200).json({ message: 'Successfully updated connection' })
      })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
  /**
    * @swagger
    * /api/click/rooms/{id}:
    *   put:
    *     summary: Update a room
    *     description:
    *       Update a Room
    *     tags: [Room]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *       - name: Room data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Room'
    *       - in: header
    *         name: Authorization
    *         schema:
    *           type: string
    *         description:
    *           Token to authenticate admin or viewer.
    *           Eg. "Authorization TlVTEfHtPR"
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.put('/api/click/rooms/:id', function (req, res) {
    const roomId = req.params.id
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const room = req.body
    if (!room.name || !room.max_guests) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    log(req, 'Room update', `Room updated by admin: ${room.name}, ${room.description}, ${room.max_guests}, ${room.current_guests}`)
    Room.update({
      name: room.name,
      description: room.description || '',
      max_guests: room.max_guests
    }, {
      where: { id: roomId }
    }).then(function (result) {
      res.status(200).json({ message: 'Successfully updated connection' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
  /**
    * @swagger
    * /api/click/rooms/{id}:
    *   get:
    *     summary: Get a room
    *     description:
    *       Get a Room
    *     tags: [Room]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.get('/api/click/rooms/:id', function (req, res) {
    Room.findById(req.params.id).then(function (rooms) {
      res.status(200).json(rooms)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
  /**
    * @swagger
    * /api/click/rooms/{id}:
    *   delete:
    *     summary: Delete a room
    *     description:
    *       Delete a Room
    *     tags: [Room]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.delete('/api/click/rooms/:id', function (req, res) {
    Room.destroy({ where: { id: req.params.id } }).then((rooms) => {
      res.status(200).json(rooms)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
}
