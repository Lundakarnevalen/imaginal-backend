const database = require('./click-models')
const Log = database.Log

module.exports = (app) => {
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
