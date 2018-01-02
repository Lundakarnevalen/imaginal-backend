const checkin = require('../models/checkin')
const users = require('../models/users')
const UserRoles = require('../models/userrole')

const checkIn = function (req, res) {
  if (!req.params.identification) {
    return res.status(400).json({
      success: false,
      message: 'Missing identification param'
    })
  }

  let checkinUser
  UserRoles.hasRole(req.user, 'administrator').then(isadmin => {
    if (isadmin) {
      return users.User.findOne({
        where: {
          $or: [{personalNumber: req.params.identification}, {email: req.params.identification}]
        }
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
        status: 200,
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
          message: req.params.identification + ' checked in successfully.'
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
    return res.json({
      success: true,
      checkedIn: !!check // throws to bool
    })
  }).catch((reject) => {
    res.status(reject.status).json({
      success: false,
      message: reject.message
    })
  })
}

const listCheckins = function (req, res) {
  UserRoles.hasRole(req.user, 'administrator')
    .then(isadmin => {
      if (!isadmin) {
        let err = {
          status: 401,
          message: 'Admin privileges required'
        }
        return Promise.reject(err)
      }
      if (!req.params.email) {
        let err = {
          status: 400,
          message: 'Missing email param'
        }
        return Promise.reject(err)
      }
      return checkin.Checkin.findAll({
        where: {checker_id: req.user.id}
      })
    })
    .then(list => {
      if (list.length === 0) {
        let err = {
          status: 200,
          message: 'No users checked in by ' + req.params.email
        }
        return Promise.reject(err)
      }
      return res.json({
        success: true,
        userids: list.map(x => (x.user_id))
      })
    })
    .catch(reject => {
      res.status(reject.status).json({
        success: false,
        message: reject.message
      })
    })
}
module.exports = {
  checkIn,
  checkStatus,
  listCheckins
}
