const userRoles = require('../models/userrole')
const users = require('../users/users')
const roles = require('../role/role')

const findUserAndRole = async (user, email, roleId) => { // callback takes two arguments, user and role
  const isAdmin = await userRoles.hasRole(user, userRoles.ADMIN)
  if (!isAdmin) {
    console.log('ISNOTADMIN')
    return { err: NOT_ADMIN }
  }

  const roleUser = await users.getUserByIdentification(email)
  if (!roleUser) {
    return { err: USER_NOT_FOUND }
  }

  const role = await roles.getRoleById(roleId)
  if (!role) {
    return { err: ROLE_NOT_FOUND }
  }
  return {err: null, user: roleUser, role: role}
}

const NOT_ADMIN = 1
const USER_NOT_FOUND = 2
const ROLE_NOT_FOUND = 3

module.exports = {
  findUserAndRole,
  NOT_ADMIN,
  USER_NOT_FOUND,
  ROLE_NOT_FOUND
}
