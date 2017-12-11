const Role = require('../models/role')
const UserRole = require('../models/userrole')

const setUser = function (req, res, next) {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    res.status(400).json({success: false, message: 'Missing parameters'})
  }

  role.setUserRoles(req.user, req.body.sectionPriorities, function (err, success, message) {
    if (err) {
      return res.status(500).json({
        success,
        message
      })
    }
    if (success) {
      return res.json({
        success,
        message
      })
    } else {
      return res.status(400).json({
        success,
        message
      })
    }
  })
}

const getUsers = function (req, res, next) {
  UserRole.getUsers(req.params.role, function (err, users) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to get users',
        err
      })
    }
    res.json({
      success: true,
      users
    })
  })
}

const addRole = function (req, res, callback) {
  Role.addRole
}

const addUser = function (req, res, callback) {
  Role.addUser
}

module.exports = {
  getUsers,
  addRole,
  addUser
}