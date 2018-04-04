const Checkpoint = require('./checkpointModel').Checkpoint

const SYSTEM_ERROR = -3
const FINAL_CHECKPOINT = -2
const INVALID_CHECKPOINT = -1

const getNextCheckpoint = async (user, checkpoint) => {
  try {
    const treasure = await checkpoint.getTreasureHunt()
    const checks = await treasure.getCheckpoints().map(ch => ch.id)
    const userCheckpoints = await user.getUserCheckpoint().map(th => th.id)
    const checksLeft = await checks.filter( (el) => !userCheckpoints.includes(el))
    
    if (checksLeft[0] === checkpoint.id) {
        await user.addUserCheckpoint([checkpoint])
    } else {
      return INVALID_CHECKPOINT
    }
    if (checksLeft.length < 0) {
       return INVALID_CHECKPOINT
    } else if (checksLeft.length === 1) {
      return FINAL_CHECKPOINT
    } else {
      return checksLeft[1]
    }
  } catch (e) {
    console.error(e)
    return INVALID_CHECKPOINT
  }
}

const checkIfCheckpointIsValid = async(user, checkpoint) => {
  try {
    const th = checkpoint.getTreasureHunt()

  } catch (e) {
    return INVALID_CHECKPOINT
  }
}

const createNewTreasureHunt = async (user, checkpoints) {
  
}

module.exports = {
  createNewTreasureHunt,
  getNextCheckpoint,
  SYSTEM_ERROR,
  FINAL_CHECKPOINT,
  INVALID_CHECKPOINT
}

