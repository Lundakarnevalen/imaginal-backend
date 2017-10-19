const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const Register = require('./controllers/register')

const passport = require('passport')
require('./config/passport')(passport)

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

/** LOGIN */

app.post('/login',
  passport.authenticate('local'),
  login.login)

/** REGISTER USER */
app.post('/register', Register.registerUser)

app.use(bodyParser.json())

/** LOGIN */
app.post('/login/email', login.login)

/*******************/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
