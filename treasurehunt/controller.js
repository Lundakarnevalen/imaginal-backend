require('./userCheckpoints')
require('./userCheckpoints').UserCheckpoints.sync()
const Users = require('../users/users.js').User
const Checkpoints = require('./checkpointModel').Checkpoint
const UserCheckpoints = require('./userCheckpoints').UserCheckpoints
const service = require('./service')

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

const checkingCheckpoint = async (req, res) => {
  const id = req.body.checkpointId
  const check = await Checkpoints.findOne({where: {id: id}})
  const us = await Users.findOne({where: {id: 1}})
  //console.log(check)
  //check,addCheckpoint([check])
  //const uc = await UserCheckpoints.create({})
  us.addUserCheckpoint([check])

  const nextCheck = await service.getNextCheckpoint(us, check)
  console.log('Next checkpoint: ' + nextCheck)

  switch (nextCheck) {
    case service.FINAL_CHECKPOINT:
      res.json({ 
        success: true,
	message: 'Treasurehunt is complete',
        nextCheck: ''
      }) 
      break
    case service.INVALID_CHECKPOINT:
      res.status(400).json({
        success: false,
	message: 'Invalid checkpoint',
	nextCheck: ''
      })
      break
    case service.SYSTEM_ERROR:
      res.status(500).json({
        success: false,
	message: 'Failed, system error',
	nextCheck:  ''
      })
      break
    default:
      res.json({
        success: true,
	message: 'You are now checked in',
	nextCheck: nextCheck
      })
      break
  }
}

module.exports = {
  getCheckpoint,
  getTreasureHuntInfo,
  checkingCheckpoint
}
