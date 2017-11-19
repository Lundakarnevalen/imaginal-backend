'use strict'
const passport = require('passport')

const loginByEmail = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(422).json({success: false, message: 'Missing parameters'})
  }
  passport.authenticate('local',
    function (err, user, info) {
      if (err) {
        return res.status(500).send(info)
      } else if (!user) {
        return res.status(401).json({
          success: false,
          message: info
        })
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.json({
            success: false,
            message: 'Incorrect login credentials.'
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
  loginByEmail
}
