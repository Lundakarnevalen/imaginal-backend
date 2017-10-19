const users = require('../models/users.js')

let login = function (req, res) {
  users.findUser(req.body.email, function (err, user) {
    if (err) {
      return res.send('')
    }
    let resp = {}
    if (user === null) {
      resp.success = false
      resp.message = 'Failed to login'
    } else {
      resp.success = true
      resp.message = 'Welcome to backend'
      resp.accessToken = user.token
    }

    res.send(resp)
  })
}

module.exports = {
  login
}
