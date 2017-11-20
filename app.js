const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const register = require('./controllers/register')
const forgotPassword = require('./controllers/forgotpassword')
const passport = require('passport')
require('./config/passport')(passport)

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(error, req, res, next) {
  if(error.name == 'SyntaxError') {
    res.status(400).json({
      status: false,
      message: 'Bad Request, invalid json'
    })
  }
  next()
})

/** REGISTER USER */
app.post('/register', register.registerUser)

/** LOGIN */
app.post('/login/email', passport.authenticate('local'), login.login)

/** FORGOT PASSWORD */
app.post('/login/forgotpassword', forgotPassword.forgotPassword)

app.post('/login/resetpassword', forgotPassword.setNewPassword)

/** AUTHENTICATE TOKENS */
app.all(/(\/)?api\/.*/,
  passport.authenticate('bearer', { session: false }),
  function (req, res, next) {
    next()
  })

/*******************/
app.post('/api/hello', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
