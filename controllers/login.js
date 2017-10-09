const Sequelize = require('sequelize')
const users = require('../models/users.js')


let login = function (req, res) {
  res.send(req.body.user)
}

let findUser = function(req, res) {
	users.findUser(req.body.username)
	.then(function(user) {
		let resp = {}
		if (user === null) {
			resp.success = false
			resp.message = "Failed to find user"
		} else {
			resp.success = true
			resp.message = "Welcome to backend"
			resp.accessToken = "tokenfan"
		}

		res.send(resp)
	})
}

module.exports = {
  login,
  findUser
}
