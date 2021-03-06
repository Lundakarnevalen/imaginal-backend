const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const login = require('./controllers/login')
const register = require('./register/register')
const forgotPassword = require('./controllers/forgotpassword')
const passport = require('passport')
require('./config/passport')(passport)
const helmet = require('helmet')
const cors = require('cors')
const role = require('./role/roleController')
const section = require('./controllers/section')
const checkin = require('./checkin/checkinController')
const users = require('./users/userController')
const treasureHunt = require('./treasureHunt/index')
const storageLocations = require('./controllers/storageLocation')
const items = require('./controllers/item')
const tags = require('./controllers/tag')
const orders = require('./controllers/order')
const warehouseUser = require('./controllers/warehouseUser')
const images = require('./controllers/images')
const events = require('./controllers/event')
const bookings = require('./controllers/booking')
const eventTimeslots = require('./controllers/eventTimeslot')

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
app.use(cors())

app.use(function (error, req, res, next) {
  if (error.name === 'SyntaxError') {
    res.status(400).json({
      status: false,
      message: 'Bad Request, invalid json'
    })
  }
  next()
})

// Swagger (for clickometer)
// You can set every attribute except paths and swagger.
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
  info: { // API informations (required)
    title: 'Clickometer Backend', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A simple dokumentation of the backend to the clickometer'
  },
  host: process.env.HOST_URL || 'localhost:3000', // Host (optional)
  basePath: '/' // Base path (optional)
}

var swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    './clickometer/login-controller.js',
    './clickometer/reporting-controller.js',
    './clickometer/event-controller.js',
    './clickometer/room-controller.js',
    './clickometer/connection-controller.js',
    './clickometer/log-controller.js',
    './clickometer/click-controller.js'
  ]
}
const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Endpoints for the clickometer
require('./clickometer/click-controller')(app)

/**
 * Unauthorized endpoints
 */
app.get('/medcheck/:personalnumber', users.getSectionByPersonalNumber)
app.get('/api/medcheck/:personalnumber', users.getSectionByPersonalNumber)
app.post('/register', register.registerUser)
app.post('/login/email', login.loginByEmail)
app.post('/login/forgotpassword', forgotPassword.forgotPassword)
app.post('/login/resetpassword', forgotPassword.setNewPassword)
app.get('/getallsections', section.getAllSections)

app.get('/api/image/cropped/:imagename', images.getcroppedimage)
app.get('/api/image/thumbnail/:imagename', images.getimage)
app.get('/api/image/full/:imagename', images.getfullimage)
app.post('/api/image/comment/:imagename', images.updateImageComment)

app.get('/event', events.list)
app.get('/event/:id', events.show)
app.get('/event/:eventId/timeslot', eventTimeslots.list)
// app.get('/timeslot/:id', eventTimeslots.show)
app.get('/booking/:id', async (req, res) => bookings.show(req, res, {uuid: true}))
app.delete('/booking/:id', async (req, res) => bookings.remove(req, res, {uuid: true}))
app.post('/timeslot/:id/booking', async (req, res) => bookings.create(req, res, {public: true}))

// Hidden endpoints. They require a lot of RAM and may crash the server.
// Therefore only for local use.
// app.get('/api/card/:imagename', images.createCard)
// app.get('/api/sectioncard/:sectionname', images.createSectionPdfs)
// app.get('/api/sectioncardall', images.createAllSectionPdfs)

// looks abuseable, but only used to keep track of winners left. Real winners are kept locally
app.post('/api/treasurehunt/win', treasureHunt.win)

/**
 * Authenticate tokens
 */

app.all(/(\/)?api\/.*/, function (req, res, next) {
  passport.authenticate('bearer', { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return next()
    })
  })(req, res, next)
})

/**
 * Authorized endpoints
 */
app.post('/api/hello', function (req, res) {
  res.json({
    success: true,
    message: 'Hello World!'
  })
})

app.get('/api/user/section/:sectionid', users.getUsersFromSection)

app.get('/api/image/badphoto/:imagename', images.updateBadPhoto)
app.get('/api/image/goodphoto/:imagename', images.updateGoodPhoto)

app.post('/api/image/full', images.uploadFullPhoto, images.uploadFullDone)
app.post(
  '/api/image/cropped',
  images.uploadCroppedPhoto,
  images.uploadCroppedDone
)

app.get('/api/user/checkin/:email', checkin.checkStatus)
app.post('/api/user/checkin/:identification', checkin.checkIn)

app.get('/api/user/listcheckins/:email', checkin.listCheckins)

app.put('/api/user/:email', users.setUserInfo)
app.get('/api/user/:identification', users.getById)

app.get('/api/users', users.getAll)

app.post('/api/section', section.setSectionPriorities)
app.get('/api/section', section.getSectionPriorities)

app.post('/api/role/:email/:roleid', role.addRole)
app.delete('/api/role/:email/:roleid', role.removeRole)
app.get('/api/role/:roleid', role.getUsers)

app.post('/api/warehouse/tag/new', tags.addTag)
app.delete('/api/warehouse/tag/delete/:tagid', tags.removeTag)
app.get('/api/warehouse/tag/list', tags.getAllTags)

app.post('/api/warehouse/product/new', items.addItem)
app.post('/api/warehouse/product/edit', items.editItem)
app.get('/api/warehouse/product/all', items.getAllItems)
app.get('/api/warehouse/product/:id', items.getItemById)
app.post('/api/warehouse/product/itemontags', items.getItemsOnTags)
app.post(
  '/api/warehouse/product/addtostoragecontent',
  items.addToStorageContent
)
app.post('/api/warehouse/product/addQuantity', items.addQuantity)
app.post('/api/warehouse/product/setQuantity', items.setQuantity)
app.post('/api/warehouse/product/moveItems', items.moveItems)
app.get('/api/warehouse/product/getAllItems', items.getAllItems)

app.get('/api/warehouse/location/inventory/:storageLocationId', orders.getInventory)
app.post('/api/warehouse/location/new', storageLocations.addStorageLocation)
app.get('/api/warehouse/location/list', storageLocations.getStorageLocations)

// app.get('/api/warehouse/product/inventory', items.getInventory)
app.get('/api/warehouse/location/:storageLocationId', storageLocations.getStorageLocationById)

app.post('/api/warehouse/order/new', orders.createOrder)
app.post('/api/warehouse/order/edit', orders.editOrder)
app.post('/api/warehouse/order/return/new', orders.createReturn)
app.get('/api/warehouse/order/list', orders.getAllOrders)
app.get('/api/warehouse/order/:id', orders.getOrderById)
app.delete('/api/warehouse/order/remove/:orderId', orders.removeOrder)
app.post('/api/warehouse/order/checkout', orders.checkoutOrderLines)
app.get('/api/warehouse/order/list/user', orders.getOrdersOnUser)
app.get('/api/warehouse/order/location/list/:storageLocationId', orders.getOrdersOnSection)
app.get('/api/warehouse/order/costbearer/list/', orders.getOrdersOnCostBearer)

app.get('/api/warehouse/user/list', warehouseUser.getAllWarehouseUsers)
app.get('/api/warehouse/user', warehouseUser.getWarehouseUserById)
app.get('/api/warehouse/user/costbearer/list', warehouseUser.getAllCostBearers)
app.get(
  '/api/warehouse/user/costbearer/:costBearerId',
  warehouseUser.getWarehouseUserByCostBearer
)

app.post('/api/treasurehunt/start', treasureHunt.start)
app.get('/api/treasurehunt/info', treasureHunt.info)

app.get('/api/event', events.list)
app.get('/api/event/:id', events.show)
app.post('/api/event/', events.create)
app.put('/api/event/:id', events.update)
app.delete('/api/event/:id', events.remove)

app.get('/api/event/:eventId/timeslot', eventTimeslots.list)
app.get('/api/timeslot/:id', eventTimeslots.show)
app.post('/api/event/:eventId/timeslot', eventTimeslots.create)
app.put('/api/timeslot/:id', eventTimeslots.update)
app.delete('/api/timeslot/:id', eventTimeslots.remove)

app.get('/api/timeslot/:id/booking', bookings.list)
app.post('/api/timeslot/:id/booking', bookings.create)
app.get('/api/booking/:id', bookings.show)
app.put('/api/booking/:id', bookings.update)
app.delete('/api/booking/:id', bookings.remove)

app.all('*', function (req, res) {
  res.status(404).json({
    success: false,
    message: 'File not found'
  })
})

const port = process.env.PORT || 3000

require('./config/database')
  .sync()
  .then(() => {
    app.listen(port, function () {
      console.log('Listening on port', port)
    })
  })
