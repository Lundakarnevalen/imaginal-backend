const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(username, password, done) {
      User.findUser(username, function (err, user) {
        if (err) {
          return done(err)
        }
        if (user === null) {
          return done(null, false, { message: 'Incorrect username.' }) // We want to send back some info saying that login didn't work. Not sure where done takes us here
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if(res) { // Passwords match
            return done(null, user) 
          } else { // Passwords don't match
            return done(null, false, { message: 'Incorrect password.' }) 
          } 
        });
      })
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

}
