const info = function (req, res) {
  res.json({
    players: 1200,
    winnersLeft: 28
  })
}

const start = function (req, res) {
  res.json({
    message: 'Game started for ' + req.user.email
  })
}

module.exports = {
  info,
  start
}
