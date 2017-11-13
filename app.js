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

/** LOGIN */

app.post('/login/email', passport.authenticate('local'), login.login)

/** FORGOT PASSWORD */
app.post('/login/forgotpassword', ForgotPassword.forgotPassword)

app.post('/login/resetpassword', ForgotPassword.setNewPassword)

/** REGISTER USER */
app.post('/register', Register.registerUser)

/*******************/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
