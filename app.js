const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const Register = require('./controllers/register')
const ForgotPassword = require('./controllers/forgotpassword')

const passport = require('passport')
require('./config/passport')(passport)

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

/** REGISTER USER */
app.post('/register', Register.registerUser)

/** LOGIN */
app.post('/login/email', passport.authenticate('local'), login.login)

/** FORGOT PASSWORD */
app.post('/login/forgotpassword', ForgotPassword.forgotPassword)

app.post('/login/resetpassword', ForgotPassword.setNewPassword)

/** REGISTER USER */
app.post('/register', Register.registerUser)

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
