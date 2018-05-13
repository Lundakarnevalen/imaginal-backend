const randomstring = require('randomstring')
const database = require('./click-models')
const Connection = database.Connection
const Room = database.Room

module.exports = (app, log, isAdmin) => {
  /**
    * @swagger
    * definitions:
    *   ConnectionCreate:
    *     properties:
    *       name:
    *         type: string
    *         example: "Connection A"
    *       description:
    *         type: string
    *         example: "Connection between room a and room b"
    *       to_room:
    *         type: number
    *         description:
    *           Room that connection lead in to.
    *         example: 1
    *       from_room:
    *         type: number
    *         description:
    *           Room that connection lead from.
    *         example: 2
    *       eventid:
    *         type: number
    *         example: 3
    * /api/click/connections/:
    *   post:
    *     summary: Create a connection
    *     description:
    *       Create a Connection
    *     tags: [Connection]
    *     parameters:
    *       - name: Connection data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/ConnectionCreate'
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
    *       500:
    */
  app.post('/api/click/connections', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const con = req.body
    if (!con.name || !con.to_room || !con.from_room || !con.eventid) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests and eventid'
      })
    }
    Connection.create({
      name: con.name,
      description: con.description,
      current_token: randomstring.generate(16)
    }).then(function (connection) {
      connection.setTo_room(con.to_room)
      connection.setFrom_room(con.from_room)
      connection.setEvent(con.eventid)
      res.status(200).json({ message: 'Successfully created connection' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
  /**
    * @swagger
    * /api/click/connections/list/{eventid}:
    *   get:
    *     summary: Get list of all connections for a event
    *     description:
    *       Get a list of all connections for a specifik event
    *     tags: [Connection]
    *     parameters:
    *       - name: eventid
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Success
    *       500:
    *         description: Internal server error
    */
  app.get('/api/click/connections/list/:eventid', function (req, res) {
    Connection.findAll({ where: { eventId: req.params.eventid } })
      .then(function (cons) { res.status(200).json(cons) })
      .catch(function (err) { res.status(500).json({ err }) })
  })
  /**
    * @swagger
    * /api/click/connections/:
    *   put:
    *     summary: Update a connection
    *     description:
    *       Update a Connection
    *     tags: [Connection]
    *     parameters:
    *       - name: Connection data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/ConnectionCreate'
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
    *       500:
    */
  app.put('/api/click/connections/:id', function (req, res) {
    const connectionId = req.params.id
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const con = req.body
    if (!con.name || !con.to_room || !con.from_room) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    Connection.update({
      name: con.name,
      description: con.description,
      toRoomId: con.to_room,
      fromRoomId: con.from_room,
      current_token: randomstring.generate(16)
    }, { where: { id: connectionId } }).then(function (connection) {
      res.status(200).json({ message: 'Successfully created connection' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })

  /**
    * @swagger
    * definitions:
    *   Connection:
    *     properties:
    *       name:
    *         type: string
    *         example: "Connection A"
    *       description:
    *         type: string
    *         example: "Connection between room a and room b"
    *       to_room:
    *         type: number
    *         description:
    *           Room that connection lead in to.
    *         example: 1
    *       from_room:
    *         type: number
    *         description:
    *           Room that connection lead from.
    *         example: 2
    *       current_clicker:
    *         type: string
    *         description:
    *           Name of the person who is the current clicker.
    *         example: 'Julian'
    * /api/click/connections/{id}:
    *   get:
    *     summary: Get a connection
    *     description:
    *       Get a connection
    *     tags: [Connection]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *       - in: header
    *         name: Authorization
    *         description:
    *           Token to authenticate admin or viewer.
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: The connection with the given ID
    *         schema:
    *           $ref: '#/definitions/Connection'
    *       401:
    *         description: User is not admin
    *       404:
    *         description: Connection not fonud
    */
  app.get('/api/click/connections/:id', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    Connection
      .findById(req.params.id)
      .then(con => res.status(200).json(con))
      .catch(err => res.status(404).json(err))
  })
  /**
    * @swagger
    * /api/click/connections/{id}:
    *   delete:
    *     summary: Delete a connection
    *     description:
    *       Delete a Connection
    *     tags: [Connection]
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
  app.delete('/api/click/connections/:id', function (req, res) {
    Connection.destroy({ where: { id: req.params.id } }).then((connections) => {
      res.status(200).json(connections)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
}
