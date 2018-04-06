require('./userCheckpoints')
require('./userCheckpoints').UserCheckpoints.sync()
const Users = require('../users/users.js').User
const Checkpoints = require('./checkpointModel').Checkpoint
const UserCheckpoints = require('./userCheckpoints').UserCheckpoints
const treasureHunt = require('./treasurehuntModel')
const service = require('./service')

const getNextCheckpoint = async (req, res) => {
  const treasueid = req.params.id
  const treasure = await treasureHunt.TreasureHunt.findOne({where: {id: treasueid}})
  console.log(treasure)
  if (!treasure) {
    return res.status(400).json({
      success: false,
      message: 'Invalid treasurehunt id'
    })
  }
  console.log(treasure)

  let nextCheck = await service.getNextCheckpoint(req.user, treasure)
  return res.json({
    success: true,
    nextCheck
  })
}

const getTreasureHuntInfo = async (req, res) => {
  const id = req.params.id

  if (!id || id < 0) {
    return res.status(400).send({
      success: false,
      message: 'Invalid treasurehunt id'
    })
  }
  const treasure = await treasureHunt.TreasureHunt.findOne({ // Add to model file
    where: {id: id}
  })
  if (!treasure) {
    return res.status(400).json({
      success: false,
      message: 'Invalid treasurehunt id'
    })
  }

  const th = await treasureHunt.getTreasureHuntIfnfo(treasure)
  res.status(200).json({
    treasurehunt: th
  })
}

const checkingCheckpoint = async (req, res) => {
  const id = req.body.checkpointId
  const check = await Checkpoints.findOne({where: {id: id}})
  if (!check) {
    return res.status(400).json({
      success: false,
      message: 'Invalid checkpoint'
    })
  }
  const treasure = await check.getTreasureHunt()
  let nextCheck = await service.getNextCheckpoint(req.user, treasure)
  console.log(nextCheck)
  if (nextCheck > 0 && id === nextCheck) {
    await req.user.addUserCheckpoint([check])
    return res.status(200).json({
      success: true,
      message: 'Checked in!'
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Not the correct checkpoint'
    })
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
  checkingCheckpoint,
  getNextCheckpoint
}
