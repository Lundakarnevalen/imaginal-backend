const randomstring = require('randomstring')
const database = require('./click-models')
const Log = database.Log
const Connection = database.Connection

const adminToken = process.env.ADMIN_TOKEN || 'metMDW8BSKEuwCXB'
const viewerToken = process.env.VIEWER_TOKEN || 'yP4WUybzrFJEkDza'

// Authentication methods
function isAdmin (req) {
  const token = req.get('Authorization')
  return token === adminToken
}
// function isViewer (req) {
//   const token = req.get('Authorization')
//   return token === viewerToken
// }

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
  // Login endpoints
  require('./login-controller')(app, log, adminToken, viewerToken)

  // Load Reporting endpoints
  require('./reporting-controller')(app, log, isAdmin)

  // Load event endpoints
  require('./event-controller')(app, log, isAdmin)

  // Load room endpoints
  require('./room-controller')(app, isAdmin, log)

  // Load connections endpoints
  require('./connection-controller')(app, log, isAdmin)

  // Load connections endpoints
  require('./log-controller')(app)
}
