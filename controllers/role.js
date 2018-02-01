const User = require('../users/users').User
const Role = require('../models/role').Role
const UserRoles = require('../models/userrole')

const addRole = function (req, res) {
  const email = req.params.email
  const roleId = req.params.roleid

  findUserAndRole(req, res, email, roleId, function (user, role) {
    user.addRole([role]).then(() => {
      return res.json({
        success: true,
        message: 'Role added'
      })
    })
  })
}

Role.prototype.toJSON = function () {
  const role = Object.assign({}, this.get())
  return role.description
}

const removeRole = function (req, res) {
  const email = req.params.email
  const roleId = req.params.roleid

  findUserAndRole(req, res, email, roleId, function (user, role) {
    user.removeRole([role]).then(() => {
      return res.json({
        success: true,
        message: 'Role removed'
      })
    })
  })
}

const getUsers = function (req, res) {
  const roleId = req.params.roleid

  UserRoles.hasRole(req.user, 'administrator').then(admin => {
    if (admin) {
      Role.findOne({
        where: {
          id: roleId
        }
      }).then(role => {
        if (!role) {
          return res.status(400).json({
            success: false,
            message: 'Role not found'
          })
        }
        role.getUsers().then(users => {
          const resp = {}
          resp.success = true
          resp.users = []
          for (let i = 0; i < users.length; ++i) {
            resp.users.push({
              email: users[i].email,
              firstName: users[i].firstName,
              lastName: users[i].lastName
            })
          }
          res.send(resp)
        })
      })
    } else {
      return notAuthorized(res)
    }
  })
}

const findUserAndRole = function (req, res, email, roleId, callback) {  // callback takes two arguments, user and role
  UserRoles.hasRole(req.user, 'administrator').then(admin => {
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
