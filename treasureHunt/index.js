const treasureModel = require('./model')

const info = async (req, res) => {
  const info = await treasureModel.info()
  if (info) {
    return res.json(info)
  }

  res.json({
    message: 'Failed to get treasurehunt info, make sure hunt exists'
  })
}

const start = async (req, res) => {
  await treasureModel.enroll(req.user)

  return res.json({
    message: 'Game started for ' + req.user.email
  })
}

const exists = (req, res) => {
  res.json({ exists: Math.random() > 0.5 })
}

module.exports = {
  info,
  start,
  exists
}
