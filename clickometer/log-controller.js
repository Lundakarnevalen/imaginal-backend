const database = require('./click-models')
const Log = database.Log

module.exports = (app) => {
  /**
    * @swagger
    * /api/click/logs/{eventid}:
    *   get:
    *     summary: Get log entries
    *     description:
    *       Get last 400 log entries
    *     tags: [Log]
    *     parameters:
    *       - name: eventid
    *         description:
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *       400:
    *       401:
    */
  app.get('/api/click/logs/:eventid', function (req, res) {
    Log.findAll({ where: { eventId: req.params.eventid } })
      .then(function (entries) { res.status(200).json(entries) })
      .catch(function (err) { res.status(500).json({ err }) })
  })
}
