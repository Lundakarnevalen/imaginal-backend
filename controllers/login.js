let login = function (req, res) {
  res.send(req.body.user)
}

module.exports = {
  login
}
