const database = require('./click-models')
const sequelize = database.sequelize
const Op = database.Op
const Room = database.Room
const Connection = database.Connection

module.exports = (app, log, isAdmin) => {
  /**
    * @swagger
    * definitions:
    *   Report:
    *     properties:
    *       name:
    *         type: string
    *         example: "Nille"
    *       delta:
    *         type: number
    *         example: 14
    *   RoomStatus:
    *     properties:
    *       current_to_room:
    *         type: number
    *         example: 56
    *       current_from_room:
    *         type: number
    *         example: 56
    * /api/click/report/{token}:
    *   post:
    *     description:
    *       Send in a report with new clicks from clicker. Returns actual number of
    *       guests in to/from room.
    *     summary: A Clickers report
    *     tags: [Reporting]
    *     parameters:
    *       - name: token
    *         description: Token of the connection
    *         in: path
    *         required: true
    *         type: string
    *       - name: Report
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Report'
    *     responses:
    *       200:
    *         description: Accesslevel of user
    *         schema:
    *           $ref: '#/definitions/RoomStatus'
    *       400:
    *         description: Unable to process the request
    *       404:
    *         description: Connection not found with token and current_clicker
    */
  app.post('/api/click/report/:token', async (req, res) => {
    const delta = req.body.delta
    const name = req.body.name

    try {
      const connection = await Connection.findOne({
        where: {
          current_token: req.params.token,
          current_clicker: name
        }
      })
      console.log(connection)
      if (!connection) {
        log(req, 'Report failure', `${name} tried to report, connection ${req.params.token} not found`)
        return res.status(404).json({message: 'Not found'})
      }
      connection.guests_passed += delta

      await Connection.update({ guests_passed: connection.guests_passed }, { where: { id: connection.id } })
      await Room.update({ current_guests: sequelize.literal(`current_guests + ${delta}`) }, { where: { id: connection.toRoomId } })
      await Room.update({ current_guests: sequelize.literal(`current_guests - ${delta}`) }, { where: { id: connection.fromRoomId } })

      const toRoom = await Room.findById(connection.toRoomId)
      const fromRoom = await Room.findById(connection.fromRoomId)
      if (delta !== 0) {
        log(req, 'Report success', `${name} reported ${delta}, connection ${connection.name},
          New to: ${toRoom.current_guests}, New from: ${fromRoom.current_guests}`)
      }
      res.json({
        current_toRoom: toRoom.current_guests,
        current_fromRoom: fromRoom.current_guests,
        connection_passed: connection.guests_passed
      })
    } catch (err) {
      log(req, 'Report failure', `${name} tried to report, connection ${req.params.token}. ERROR.`)
      res.status(400).json(err)
    }
  })

  /**
    * @swagger
    * definitions:
    *   NewToken:
    *     properties:
    *       new_token:
    *         type: string
    *         example: 'jYuTYNwaFz'
    * /api/click/connections/revoke/{id}:
    *   patch:
    *     summary: Revoke token from connection
    *     description:
    *       Revoke token from a connection.
    *       It moves current token to previous token and empties the
    *       current_clicker field.
    *     tags: [Reporting]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *       - in: header
    *         name: Authorization
    *         schema:
    *           type: string
    *         description:
    *           Token to authenticate admin or viewer.
    *           Eg. "Authorization TlVTEfHtPR"
    *     responses:
    *       200:
    *         description: Successfully revoke connection
    *         schema:
    *           $ref: '#/definitions/NewToken'
    *       401:
    *         description: User not admin
    *       500:
    *         description: Internal server error
    */
  app.patch('/api/click/connections/revoke/:id', function (req, res) {
    if (!isAdmin(req)) {
      log(req, 'Revoke failure', `Not admin tried to revoke`)
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    Connection
      .findById(req.params.id)
      .then(connection => {
        // Update values
        connection.prev_token = connection.current_token
        connection.current_token = randomstring.generate(16)
        connection.current_clicker = ''

        // Save changes
        connection.save().then(result => {
          log(req, 'Revoke connection', `${req.params.id} - ${connection.name} was revoked.`)
          res.status(200).json({new_token: connection.current_token})
        }).catch(err => res.status(500).json(err))
      })
  })
  /**
    * @swagger
    * /api/click/connections/connect/{id}:
    *   patch:
    *     summary: Become clicker to a connection
    *     description:
    *       Connect to a connection
    *     tags: [Reporting]
    *     parameters:
    *       - name: id
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Successfully connected to connection
    *         schema:
    *           $ref: '#/definitions/NewToken'
    *       400:
    *         description: Bad request, name-value is not in body.
    *       401:
    *         description: Connection already has a clicker
    *       404:
    *         description:  Unable to find connection by current_token
    *       500:
    *         description: Internal Server Error
    */
  app.patch('/api/click/connections/connect/:id', function (req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        message: 'Missing parameter. Send name'
      })
    }
    Connection
      .findById(req.params.id)
      .then(connection => {
        // Block if connection already has clicker - DEPRICATED
        // if (connection.current_clicker) {
        //   log(req, 'Connect connection', `$(req.body.name) tried to connect to ${connection.name}. Already taken`)
        //   return res.status(401).json({message: 'Connection already used'})
        // }
        // update values
        connection.prev_token = connection.current_token
        connection.current_token = randomstring.generate(16)
        connection.current_clicker = req.body.name

        // Save changes
        connection.save().then(result => {
          log(req, 'Connect connection', `${req.body.name} connected to ${connection.name}.`)
          res.status(200).json({new_token: connection.current_token})
        }).catch(err => res.status(500).json(err))
      }).catch(err => {
        res.status(404).json({message: 'Connection not found', err})
      })
  })

  /**
    * @swagger
    * definitions:
    *   Message:
    *     properties:
    *       message:
    *         type: string
    *         example: "Successfully disconnected from connection"
    * /api/click/connections/disconnect/{token}:
    *   patch:
    *     summary: Disconnect as clicker
    *     description:
    *       Disconnect to a connection
    *     tags: [Reporting]
    *     parameters:
    *       - name: token
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Successfully disconnected from a connection
    *         schema:
    *           $ref: '#/definitions/Message'
    *       500:
    *         description: Internal Server Error
    */
  app.patch('/api/click/connections/disconnect/:token', function (req, res) {
    Connection
      .findOne({ where: { current_token: req.params.token } })
      .then(connection => {
        // Update values
        connection.prev_token = connection.current_token
        connection.current_token = randomstring.generate(16)
        connection.current_clicker = ''

        // Save changes
        connection.save().then(result => {
          res.status(200).json({message: 'Successfully disconnected'})
        }).catch(err => res.status(500).json(err))
      })
  })
  /**
    * @swagger
    * /api/click/restart:
    *   post:
    *     summary: Restart all counts and clickers
    *     description:
    *       Restart all current_guests in rooms and
    *       current_clicker in connections
    *     tags: [Reporting]
    *     parameters:
    *       - in: header
    *         name: Authorization
    *         schema:
    *           type: string
    *         description:
    *           Token to authenticate admin or viewer.
    *           Eg. "Authorization TlVTEfHtPR"
    *     responses:
    *       200:
    *         description: Successfully Reset all connections and rooms
    *         schema:
    *           $ref: '#/definitions/Message'
    *       400:
    *         description: Internal Server Error
    *       401:
    *         description: Not correct admin token in header
    */
  app.post('/api/click/restart', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    Connection
      .update({current_clicker: ''}, {where: { current_clicker: { [Op.ne]: '' } }})
      .then(affectedRows => {
        Room
          .update({current_guests: 0}, {where: { current_guests: { [Op.ne]: 0 } }})
          .then(affRows => {
            log(req, 'Restarted', ``)
            res.status(200).json({message: 'Success'})
          })
          .catch(err => res.status(400).json(err))
      }).catch(err => res.status(400).json(err))
  })
}
