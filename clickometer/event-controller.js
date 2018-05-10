const database = require('./click-models')
const Event = database.Event

module.exports = (app, log, isAdmin) => {
  /**
    * @swagger
    * definitions:
    *   EventCreate:
    *     properties:
    *       name:
    *         type: string
    *         example: "Dansen Friday"
    *       description:
    *         type: string
    *         example: "Event for dansen during saturday night fever"
    * /api/click/events/:
    *   post:
    *     summary: Create a event
    *     description:
    *       Create a Event
    *     tags: [Event]
    *     parameters:
    *       - name: Event data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/EventCreate'
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
  app.post('/api/click/events', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const ev = req.body
    if (!ev.name || !ev.description) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    Event.create({
      name: ev.name,
      description: ev.description
    }).then(function (ev) {
      res.status(200).json({ message: 'Successfully created event' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })

  /**
    * @swagger
    * /api/click/events/:
    *   put:
    *     summary: Update a event
    *     description:
    *       Update a Event
    *     tags: [Event]
    *     parameters:
    *       - name: Event data
    *         description:
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/EventCreate'
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
  app.put('/api/click/events/:id', function (req, res) {
    const eventId = req.params.id
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    const ev = req.body
    if (!ev.name || !ev.description) {
      return res.status(400).json({
        message: 'Missing parameter. Send name and max_guests'
      })
    }
    Event.update({
      name: ev.name,
      description: ev.description
    }, { where: { id: eventId } }).then(function (event) {
      res.status(200).json({ message: 'Successfully created event' })
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })

  /**
    * @swagger
    * definitions:
    *   Event:
    *     properties:
    *       name:
    *         type: string
    *         example: "Event A"
    *       description:
    *         type: string
    *         example: "Event between room a and room b"
    * /api/click/events/{id}:
    *   get:
    *     summary: Get a event
    *     description:
    *       Get a event
    *     tags: [Event]
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
    *         description: The event with the given ID
    *         schema:
    *           $ref: '#/definitions/Event'
    *       401:
    *         description: User is not admin
    *       404:
    *         description: Event not fonud
    */
  app.get('/api/click/events/:id', function (req, res) {
    if (!isAdmin(req)) {
      return res.status(401).json({
        message: 'User not admin'
      })
    }
    Event
      .findById(req.params.id)
      .then(con => res.status(200).json(con))
      .catch(err => res.status(404).json(err))
  })
  /**
    * @swagger
    * /api/click/events/:
    *   get:
    *     summary: Get list of all events
    *     description:
    *       Get a list of all events
    *     tags: [Event]
    *     responses:
    *       200:
    *         description: Success
    *       500:
    *         description: Internal server error
    */
  app.get('/api/click/events', function (req, res) {
    Event.findAll().then(function (cons) {
      res.status(200).json(cons)
    }).catch(function (err) {
      res.status(500).json({ err })
    })
  })
}
