
const validateUser = function (user, success, fail) {
  if (user.email && user.password) {
    success()
  } else {
    fail('Missing parameters.')
  }
}

module.exports = {
  validateUser
}
