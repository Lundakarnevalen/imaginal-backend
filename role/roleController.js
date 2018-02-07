const users = require('../users/users')
const userRoles = require('../models/userrole')
const roles = require('./role')
const roleService = require('./roleService')

const addRole = async (req, res) => {
  const email = req.params.email
  const roleId = req.params.roleid

  const userAndRole = await roleService.findUserAndRole(req.user, email, roleId)

  switch (userAndRole.err) {
    case roleService.NOT_ADMIN:
      return notAuthorized(res)

    case roleService.ROLE_NOT_FOUND:
    case roleService.USER_NOT_FOUND:
      return res.status(400).json({
        success: false,
        message: 'Failed to find role/user'
      })
  }

  const user = userAndRole.user
  const role = userAndRole.role
  await user.addRole([role])

  return res.json({
    success: true,
    message: 'Role added'
  })
}

const removeRole = async (req, res) => {
  const email = req.params.email
  const roleId = req.params.roleid

  const isAdmin = await userRoles.hasRole(req.user, userRoles.ADMIN)
  if (!isAdmin) {
    return notAuthorized(res)
  }

  const user = await users.getUserByIdentification(email)
  const role = await roles.getRoleById(roleId)

  if (user && role) {
    await user.removeRole([role])
    return res.json({
      success: true,
      message: 'Role removed'
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Failed to find role and/or user'
    })
  }
}

const getUsers = async (req, res) => {
  const roleId = req.params.roleid

  const isAdmin = await userRoles.hasRole(req.user, userRoles.ADMIN)
  if (!isAdmin) {
    return notAuthorized(res)
  }
  const role = await roles.getRoleById(roleId)

  if (!role) {
    return res.status(400).json({
      success: false,
      message: 'Role not found'
    })
  }

  const roleUsers = await role.getUsers()
  const resp = {}
  resp.success = true
  resp.users = []
  console.log(roleUsers.length)
  for (let i = 0; i < roleUsers.length; ++i) {
    resp.users.push({
      email: roleUsers[i].email,
      firstName: roleUsers[i].firstName,
      lastName: roleUsers[i].lastName
    })
  }
  res.send(resp)
}

const notAuthorized = function (res) {
  return res.status(401).json({ // The user that sent the request is not admin
    success: false,
    message: 'Unauthorized'
  })
}

module.exports = {
  addRole,
  removeRole,
  getUsers
}
