const checkin = require('../models/checkin')
const users = require('../models/users')
const UserRoles = require('../models/userrole')

const checkIn = function (req, res) {
  if (!req.params.email) {
    return res.status(400).json({
      success: false,
      message: 'Missing email param'
    })
  }

  checkin.Checkin.findOne({
    where: {user_id: req.params.email}
  }).then(row => {
    if (row) {
      return res.status(400).json({
        success: false,
        message: req.params.email + ' is already checked in.'
      })
    }
    UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
      if (isadmin) {
        users.User.findOne({
          where: {email: req.params.email}
        }).then(user => {
          if (user) {
            checkin.Checkin.create({
              user_id: req.params.email
            }).then(() => {
              return res.json({
                success: true,
                message: req.params.email + ' checked in successfully.'
              })
            })
          } else {
            return res.status(400).json({
              success: false,
              message: 'No such user'
            })
          }
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Admin privileges required.'
        })
      }
    })
  })
}

const checkStatus = function (req, res) {
  if (!req.params.email) {
    return res.status(400).json({
      success: false,
      message: 'Missing email param'
    })
  }

  checkin.Checkin.findOne({
    where: {user_id: req.params.email}
  }).then((check) => {
    if (check) {
      return res.json({
        success: true,
        message: req.params.email + ' is checked in.'
      })
    }
    res.status(400).json({
      success: false,
      message: req.params.email + ' is not checked in.'
    })
  })
}

module.exports = {
  checkIn,
  checkStatus
}
