'use strict'
const passport = require('passport')
const users = require('../models/users')

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

        const allRoles = await user.getRoles()
        const checkedIn = await users.isCheckedIn(user)
        const roles = await allRoles.map(role => role.toJSON()).map(role => {
          return role
        })

        return res.json({
          success: true,
          message: 'Successfully logged in',
          accessToken: req.user.token,
          userinfo: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            postNumber: user.postNumber,
            city: user.city,
            careOf: user.careOf,
            personalNumber: user.personalNumber,
            checkedIn: checkedIn
          },
          roles
        })
      })
    })(req, res, next)
}

module.exports = {
  loginByEmail
}
