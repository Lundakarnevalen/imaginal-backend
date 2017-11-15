'use strict'
const passport = require('passport')
require('../config/passport')(passport)

let login = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({message: 'Missing parameters'})
  }
  passport.authenticate('local',
    function (err, user, info) {
      if (err) {
        return res.json({
          message: info
        })
      } else if (!user) {
        return res.json({
          message: info
        })
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json({
            message: 'Login failure!'
          })
        }
        return res.json({
          success: true,
          message: 'Successfully logged in',
          accessToken: req.user.token
        })
      })
    })(req, res, next)
}

module.exports = {
  login
}
