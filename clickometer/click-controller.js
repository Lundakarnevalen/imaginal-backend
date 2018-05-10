const randomstring = require('randomstring')
const database = require('./click-models')
const sequelize = database.sequelize
const Op = database.Op
const Room = database.Room
const Log = database.Log
const Connection = database.Connection

const adminToken = process.env.ADMIN_TOKEN || 'metMDW8BSKEuwCXB'
const viewerToken = process.env.VIEWER_TOKEN || 'yP4WUybzrFJEkDza'

// Authentication methods
function isAdmin (req) {
  const token = req.get('Authorization')
  return token === adminToken
}
function isViewer (req) {
  const token = req.get('Authorization')
  return token === viewerToken
}

// Logging method
function log (req, eventType, value) {
  Log.create({
    ipadress: req.connection.remoteAddress,
    timestamp: Date.now(),
    eventType,
    value
  })
}

module.exports = (app) => {
  /**
    * @swagger
    * definitions:
    *   Login:
    *     required:
    *       - user
    *       - password
    *     properties:
    *       user:
    *         type: string
    *         example: "nille"
    *       password:
    *         type: string
    *         example: "123456"
    *   Accesslevel:
    *     properties:
    *       access_level:
    *         type: string
    *         example: "admin"
    *       logintoken:
    *         description: "Hardcoded token for admin or viewer"
    *         example: "XwPp9xazJ0ku5CZn"
    *         type: string
    * /api/click/login:
    *   post:
    *     description: Validates username and pw and says accesslevel
    *     summary: Validate username and password
    *     tags: [Login]
    *     parameters:
    *       - name: Loginparameters
    *         description: Username and password
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Login'
    *     responses:
    *       200:
    *         description: Accesslevel of user
    *         schema:
    *           $ref: '#/definitions/Accesslevel'
    *       401:
    *         description: Login not successfull
    */
  app.post('/api/click/login', function (req, res) {
    const credentials = req.body
    const [user, pw] = [credentials.user, credentials.password]

    if (user === 'admin' && pw === (process.env.ADMIN_PW || 'nilleiscute')) {
      log(req, 'Login', `${user} successfully logged in`)
      return res.status(200).json({
        access_level: 'admin',
        logintoken: adminToken
      })
    } else if (user === 'admin') {
      log(req, 'Login', `${user} didnt log in, wrong password`)
      return res.status(401).json({
        message: 'Not successful login'
      })
    }
    // if(user === 'viewer' && pw === (process.env.VIEWER_PW || 'nilleiswoaw')){
    //   log(req, 'Login', `${user} successfully logged in`)
    //   return res.status(200).json({
    //     access_level: 'viewer',
    //     logintoken: viewerToken,
    //   });
    // }
    log(req, 'Login', `${user} successfully logged in`)
    return res.status(200).json({
      access_level: 'clicker',
      logintoken: viewerToken
    })
  })

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
    *       - name: Id
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
    *       - name: Id
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
    if (!room.name || !room.max_guests) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    Room.create({
      name: room.name,
      description: room.description,
      max_guests: room.max_guests
    })
    log(req, 'Room created', `Room: ${room.name}, ${room.description}, ${room.max_guests}`)
    res.status(200).json({
      message: 'Successfully created room'
    })
  })
  /**
    * @swagger
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
    *       - name: Id
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
    * definitions:
    *   RoomList:
    *     type: array =============================
    * /api/click/rooms:
    *   get:
    *     summary: Get list of all rooms
    *     description:
    *       Get list of all Room
    *     tags: [Room]
    *     parameters:
    *     responses:
    *       200:
    *         description: List of all rooms
    *         schema:
    *           $ref: '#/definitions/RoomList'
    *       500:
    *         description: Internal server error
    */
  app.get('/api/click/rooms', function (req, res) {
    Room.findAll().then(function (rooms) {
      res.status(200).json(rooms)
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
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.delete('/api/click/rooms/:id', function (req, res) {
    Room.findById(req.params.id).then(function (rooms) {
      res.status(200).json(rooms)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })

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
    if (!con.name || !con.to_room || !con.from_room) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    Connection.create({
      name: con.name,
      description: con.description,
      current_token: randomstring.generate(16)
    }).then(function (connection) {
      connection.setTo_room(con.to_room)
      connection.setFrom_room(con.from_room)
      res.status(200).json({ message: 'Successfully created connection' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
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
    *       - name: Id
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
    * /api/click/connections/:
    *   get:
    *     summary: Get list of all connections
    *     description:
    *       Get a list of all connections
    *     tags: [Connection]
    *     parameters:
    *     responses:
    *       200:
    *         description: Success
    *       500:
    *         description: Internal server error
    */
  app.get('/api/click/connections', function (req, res) {
    Connection.findAll().then(function (cons) {
      res.status(200).json(cons)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })

  /**
    * @swagger
    * /api/click/logs:
    *   get:
    *     summary: Get log entries
    *     description:
    *       Get last 400 log entries
    *     tags: [Log]
    *     parameters:
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.get('/api/click/logs', function (req, res) {
    Log.findAll().then(function (entries) {
      res.status(200).json(entries.reverse())
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
}
