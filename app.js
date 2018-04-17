const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
const storageLocations = require('./controllers/storageLocation')
const items = require('./controllers/item')
const tags = require('./controllers/tag')
const orders = require('./controllers/order')
const warehouseUser = require('./controllers/warehouseUser')

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

/**
 * Unauthorized endpoints
 */
app.get('/api/medcheck/:personalnumber', users.getSectionByPersonalNumber)
app.post('/register', register.registerUser)
app.post('/login/email', login.loginByEmail)
app.post('/login/forgotpassword', forgotPassword.forgotPassword)
app.post('/login/resetpassword', forgotPassword.setNewPassword)
app.get('/getallsections', section.getAllSections)

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

app.post('/api/warehouse/product/new', items.createItem)
app.post('/api/warehouse/product/edit', items.editItem)
app.get('/api/warehouse/product/all', items.getAllItems)
app.get('/api/warehouse/product/:id', items.getItemById)
app.post('/api/warehouse/product/itemontags', items.getItemsOnTags)

app.post('/api/warehouse/location/new', storageLocations.addStorageLocation)
app.get('/api/warehouse/location/list', storageLocations.getStorageLocations)

app.post('/api/warehouse/getLocationById', storageLocations.getById) /* For testing */
app.post('/api/warehouse/product/addQuantity', items.addQuantity) /** For testing */
app.get('/api/warehouse/product/getAllItems', items.getAllItems) /** For testing */


//app.get('/api/warehouse/product/inventory', items.getInventory)

app.post('/api/warehouse/order/new', orders.createOrder)
app.post('/api/warehouse/order/edit', orders.editOrder)
app.get('/api/warehouse/order/list', orders.getAllOrders)
app.get('/api/warehouse/order/removeOrder/:orderId', orders.removeOrder)

app.get('/api/warehouse/order/list/:userId', orders.getOrdersOnUser)
app.delete('/api/warehouse/tag/delete/:orderId', tags.removeTag)


app.get('/api/warehouse/user/list', warehouseUser.getAllWarehouseUsers)
app.get('/api/warehouse/user/', warehouseUser.getWarehouseUserById)
app.get('/api/warehouse/user/costbearer/list', warehouseUser.getAllCostBearers)
app.get('/api/warehouse/user/costbearer/:costBearerId', warehouseUser.getWarehouseUserByCostBearer)

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
