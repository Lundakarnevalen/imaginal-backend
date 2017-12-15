const checkin = require('../models/checkin')
const users = require('../models/users')
const UserRoles = require('../models/userrole')

const checkIn = function (req, res) {
  if (!req.params.pin) {
    return res.status(400).json({
      success: false,
      message: 'Missing PIN param'
    })
  }

  let checkinUser
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin) {
      return users.User.findOne({
        where: {personalNumber: req.params.pin}
      })
    } else {
      let err = {
        status: 401,
        message: 'Admin privileges required.'
      }
      return Promise.reject(err)
    }
  }).then((user) => {
    if (user) {
      checkinUser = user
      return checkin.Checkin.findOne({
        where: {user_id: user.id}
      })
    } else {
      let err = {
        status: 400,
        message: 'No such user'
      }
      return Promise.reject(err)
    }
  }).then((row) => {
    if (row) {
      let err = {
        status: 400,
        message: checkinUser.email + ' is already checked in.'
      }
      return Promise.reject(err)
    } else {
      checkin.Checkin.create({
        user_id: checkinUser.id,
        checker_id: req.user.id
      }).then(() => {
        return res.json({
          success: true,
          message: req.params.pin + ' checked in successfully.'
        })
      })
    }
  }).catch((reject) => {
    res.status(reject.status).json({
      success: false,
      message: reject.message
    })
  })
}

const checkStatus = function (req, res) {
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin || req.params.email === req.user.email) {
      if (!req.params.email) {
        let err = {
          status: 400,
          message: 'Missing email param'
        }
        return Promise.reject(err)
      }
      return users.User.findOne({
        where: {email: req.params.email}
      })
    } else {
      let err = {
        status: 401,
        message: 'Unauthorized'
      }
      return Promise.reject(err)
    }
  }).then((user) => {
    if (!user) {
      let err = {
        status: 400,
        message: 'No such user'
      }
      return Promise.reject(err)
    }
    return checkin.Checkin.findOne({
      where: {user_id: user.id}
    })
  }).then((check) => {
    if (check) {
      return res.json({
        success: true,
        message: req.params.email + ' is checked in.'
      })
    }
    let err = {
      status: 400,
      message: req.params.email + ' is not checked in.'
    }
    return Promise.reject(err)
  }).catch((reject) => {
    res.status(reject.status).json({
      success: false,
      message: reject.message
    })
  })
}

module.exports = {
  checkIn,
  checkStatus
}
