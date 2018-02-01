'use strict'
const passport = require('passport')

const loginByEmail = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'Missing parameters'
    })
  }

  passport.authenticate('local',
    function (err, user, info) {
      if (err) {
        return res.status(500).send(info)
      } else if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect login credentials.'
        })
      }
      req.logIn(user, async (err) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Incorrect login credentials.'
          })
        }

        const userinfo = user.toJSON()

        return res.json({
          success: true,
          message: 'Successfully logged in',
          accessToken: req.user.token,
          userinfo,
          user: userinfo // compability with app
        })
      })
    })(req, res, next)
}

module.exports = {
  loginByEmail
}
