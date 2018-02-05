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

        const checkedIn = await users.isCheckedIn(user)
        const allRoles = await user.getRoles()
        const roles = await allRoles.map(role => role.toJSON())
        const karnevalistInfo = await users.KarnevalistInfo.findOne({
          where: {userId: user.id},
          attributes: ['language',
            'driversLicense',
            'foodPreference',
            'disability',
            'corps',
            'startOfStudies',
            'pastInvolvement',
            'groupLeader',
            'misc',
            'plenipotentiary',
            'bff',
            'studentNation']
        })

        const skills = await user.getUserSkill().map(skill => skill.toJSON().skill)
        const interests = await user.getUserInterest().map(interest => interest.toJSON().interest)
        const bigPleasures = await user.getUserBigAudition().map(pleasure => pleasure.toJSON().audition)
        const smallPleasures = await user.getUserSmallAudition().map(pleasure => pleasure.toJSON().audition)

        const userinfo = {
          checkedIn,
          ...user.toJSON(),
          ...karnevalistInfo.dataValues,
          roles: [...roles],
          skills,
          interests,
          bigPleasures,
          smallPleasures
        }

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
