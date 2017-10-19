'use strict'

let login = function (req, res) {
  res.send({
    success: true,
    message: 'Successfully logged in',
    accessToken: req.user.token
  })
})

module.exports = {
  login
}
