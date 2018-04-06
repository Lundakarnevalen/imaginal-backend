require('./userCheckpoints')
require('./userCheckpoints').UserCheckpoints.sync()
const Users = require('../users/users.js').User
const Checkpoints = require('./checkpointModel').Checkpoint
const UserCheckpoints = require('./userCheckpoints').UserCheckpoints
const treasureHunt = require('./treasurehuntModel')
const service = require('./service')

const getTreasureHuntInfo = async (req, res) => {
  const id = req.params.id

  if (!id || id < 0) {
    return res.status(400).send()
  }
  const treasure = await require('./treasurehuntModel').TreasureHunt.findOne({ // Add to model file
    where: {id: id}
  })
  if (!treasure) {
    return res.status(400).send()
  }

  const th = treasureHunt.getTreasureHuntInfo(treasure)
  res.status(200).json({
    th
  })
}

const checkingCheckpoint = async (req, res) => {
  const id = req.body.checkpointId
  const check = await Checkpoints.findOne({where: {id: id}})
  const us = await Users.findOne({where: {id: 1}})

  //us.addUserCheckpoint([check])

  let nextCheck = await service.getNextCheckpoint(us, check)
  if (nextCheck !== service.FINAL_CHECKPOINT || nextCheck !== service.INVALID_CHECKPOINT ) {
    await req.user.addUserCheckpoint([check])
  }
  nextCheck = await service.getNextCheckpoint(us, check) //It's ugly, but it works for now
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
        nextCheck: ''
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

const getAllTreasuresInfo = async (req, res) => {
  const treasurehunts = await treasureHunt.getAllTreasureHunts()
  res.json(treasurehunts)
}

const createNewTH = async (req, res) => {
  const isValidArray = (input) => {
    return input && Array.isArray(input)
  }

  const checkpoints = req.body.checkpoints
  const treasureName = req.body.treasurename

  if (!isValidArray(checkpoints)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid checkpoint input'
    })
  }

  checkpoints.filter(x => !isValidArray(x))

  if (checkpoints.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid checkpoint input'
    })
  }

  const newth = await treasureHunt.TreasureHunt.create({description: treasureName})

  checkpoints.forEach(async (x) => {
    let newc = await Checkpoints.create({
      locationX: x.locationX,
      locationY: x.locationY
    })
    await newth.addCheckpoints([newc])
  })

  res.json({success: true})
}

module.exports = {
  getTreasureHuntInfo,
  getAllTreasuresInfo,
  createNewTH,
  checkingCheckpoint
}
