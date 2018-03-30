require('./UserCheckpoints')

const getCheckpoint = async (req, res) => {
  await require('./treasurehuntModel').TreasureHunt.sync()
  await require('./checkpointModel').Checkpoint.sync()
  await require('./UserCheckpoints').UserCheckpoints.sync()
  res.status(200).send()
}
const getTreasureHuntInfo = async (req, res) => {
  const id = req.params.id

  if (!id || id < 0) {
    return res.status(400).send()
  }

  const treasure = await require('./treasurehuntModel').TreasureHunt.findOne({ // Add to model file
    where: { id: id }
  })

  if (!treasure) {
    return res.status(400).send()
  }

  const asd = await treasure.getCheckpoints()

  const length = asd.length
  console.log(asd.length)
  res.status(200).json({
    length
  })
}

module.exports = {
  getCheckpoint,
  getTreasureHuntInfo
}
