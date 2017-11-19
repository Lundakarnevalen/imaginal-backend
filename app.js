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

/** REGISTER USER */
app.post('/register', Register.registerUser)

/** LOGIN */

// Validera innan vi ger till passport?
app.post('/login/email', function (req, res, next) {
  passport.authenticate('local',
    function (err, user, info) {
      if (err) {
        return res.json({
          message: 'Internal Server Error!'
        })
      } else if (!user) {
        return res.json({
          message: 'No Such User!'
        })
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json({
            message: 'Login Failure!'
          })
        }
        return res.json({
          message: 'Login Success!'
        })
      })
    })(req, res, next)
})

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
