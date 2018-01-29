const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const User = require('../models/users').User
const KarnevalistInfo = require('../models/users').KarnevalistInfo
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (passport) {
  const secretToken = process.env.TOKEN_SECRET || 'secret'
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (username, password, done) {
      User.findOne({
        where: {email: username}
      })
      .then(function (user) {
        if (!user) {
          return done(null, false)
        }
        bcrypt.compare(password, user.password, function (err, res) {
          if (err) {
            return done(err)
          }
          if (res) {
            user.token = jwt.sign({email: username}, secretToken)
            user.save().then(() => {
              return done(null, user)
            })
          } else {
            return done(null, false)
          }
        })
      })
    }
  ))

  passport.use(new BearerStrategy(
    function (token, done) {
      jwt.verify(token, secretToken, { ignoreExpiration: true }, function (err, decoded) {
        if (err) {
          return done(null, false)
        }
        User.findOne({
          attributes: ['id', 'email', 'firstName', 'lastName', 'phoneNumber', 'address', 'postNumber', 'city', 'careOf', 'personalNumber', 'shirtSize'],
          where: { token: token },
          include: [{model: KarnevalistInfo}]
        })
        .then(function (user) {
          if (!user) {
            return done(null, false)
          }
          return done(null, user)
        })
        .catch(function (err) {
          return done(err)
        })
      })
    }))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
}
