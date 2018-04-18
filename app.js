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
const images = require('./controllers/images')

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

// Update UserImage to be bad or good
app.get('/api/image/badphoto/:imagename', images.updateBadPhoto)
app.get('/api/image/goodphoto/:imagename', images.updateGoodPhoto)

// Upload new photos to karnevalistbilder and karnevalistbilder-cropped buckets
app.post('/api/image/full', images.uploadFullPhoto, images.uploadFullDone)
app.post('/api/image/cropped', images.uploadCroppedPhoto, images.uploadCroppedDone)


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
