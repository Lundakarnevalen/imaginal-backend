const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const register = require('./controllers/register')
const forgotPassword = require('./controllers/forgotpassword')
const passport = require('passport')
require('./config/passport')(passport)
const role = require('./controllers/role')
const section = require('./controllers/section')
const checkin = require('./controllers/checkin')
const users = require('./controllers/users')

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(error, req, res, next) {
  if (error.name === 'SyntaxError') {
    res.status(400).json({
      status: false,
      message: 'Bad Request, invalid json',
    })
  }
  next()
})

/**
 * Unauthorized endpoints
 */
app.post('/register', register.registerUser)
app.post('/login/email', login.loginByEmail)
app.post('/login/forgotpassword', forgotPassword.forgotPassword)
app.post('/login/resetpassword', forgotPassword.setNewPassword)

/**
 * Authenticate tokens
 */
app.all(/(\/)?api\/.*/, function(req, res, next) {
  passport.authenticate('bearer', { session: false }, function(
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
        message: 'Unauthorized',
      })
    }

    req.logIn(user, function(err) {
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
app.post('/api/hello', function(req, res) {
  res.json({
    success: true,
    message: 'Hello World!',
  })
})

app.get('/api/user/checkin/:email', checkin.checkStatus)
app.post('/api/user/checkin/:identification', checkin.checkIn)

app.get('/api/user/listcheckins/:email', checkin.listCheckins)

app.put('/api/user/:email', users.setUserInfo)
app.get('/api/user/:email', users.getById)
app.get('/api/users', users.getAll)

app.post('/api/section', section.setSectionPriorities)
app.get('/api/section', section.getSectionPriorities)

app.post('/api/role/:email/:roleid', role.addRole)
app.delete('/api/role/:email/:roleid', role.removeRole)
app.get('/api/role/:roleid', role.getUsers)

app.all('*', function(req, res) {
  res.status(404).json({
    success: false,
    message: 'File not found',
  })
})

require('./config/database')
  .sync()
  .then(() => {
    app.listen(3000, function() {
      console.log('Listening on port 3000')
    })
  })
