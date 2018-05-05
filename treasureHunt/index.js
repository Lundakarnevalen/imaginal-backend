const treasureModel = require('./model')

const info = async (req, res) => {
  const info = await treasureModel.info()
  if (info) {
    return res.json(info)
  }

  res.status(404).json({
    message: 'Failed to get treasurehunt info, make sure hunt exists'
  })
}

const start = async (req, res) => {
  await treasureModel.enroll(req.user)

  return res.json({
    message: 'Game started for ' + req.user.email
  })
}

const win = async (req, res) => {
  treasureModel.win(req.user)

  return res.json({
    message: 'Congratulations!!'
  })
}

module.exports = {
  info,
  start,
  win
}
