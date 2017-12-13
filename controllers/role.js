const User = require('../models/users').User
const Role = require('../models/role').Role

const addRole = function (req, res) {
  let email = req.params.email
  let roleId = req.params.roleid

  findUserAndRole(req, res, email, roleId, function (user, role) {
    user.setRoles([role])
    return res.json({
      success: true,
      message: 'Role added'
    })
  })
}

const removeRole = function (req, res) {
  let email = req.params.email
  let roleId = req.params.roleid

  findUserAndRole(req, res, email, roleId, function (user, role) {
    user.removeRole([role])
    return res.json({
      success: true,
      message: 'Role removed'
    })
  })
}

const getUsers = function (req, res) {
  let roleId = req.params.roleid

  Role.findOne({
    where: {
      id: roleId
    }
  }).then(role => {
    role.getUsers().then(users => {
      let resp = {}
      resp.success = true
      resp.users = []
      for (let i = 0; i < users.length; ++i) {
        resp.users.push({
          email: users[i].email,
          name: users[i].name
        })
      }
      res.send(resp)
    })
  })
}

const findUserAndRole = function (req, res, email, roleId, callback) {  // callback takes two arguments, user and role
  isAdmin(req.user).then(admin => {
    if (admin) {
      findUser(email).then(user => {
        if (!user) {
          return objectNotFound(res, 'User')
        }
        findRole(roleId).then(role => {
          if (!role) {
            return objectNotFound(res, 'Role')
          }
          callback(user, role)
        })
      })
    } else {
      return notAuthorized(res)
    }
  })
}

const isAdmin = function (user) { // returns a boolean-promise
  return Role.findOne({
    where: {description: 'Administrator'}
  }).then(role => {
    return user.hasRole(role)
  })
}

const findUser = function (email) { // returns a user-promise
  return User.findOne({
    where: {email: email}
  })
}

const findRole = function (roleId) { // returns a role-promise
  return Role.findOne({
    where: {id: roleId}
  })
}

const notAuthorized = function (res) {
  return res.status(401).json({ // The user that sent the request is not admin
    success: false,
    message: 'Unauthorized'
  })
}

const objectNotFound = function (res, object) { // object is the thing that was not found, like a user or role
  return res.status(400).json({
    success: false,
    message: object + ' not found'
  })
}

module.exports = {
  addRole,
  removeRole,
  getUsers
}
