const Checkpoint = require('./checkpointModel').Checkpoint

const SYSTEM_ERROR = -3
const FINAL_CHECKPOINT = -2
const INVALID_CHECKPOINT = -1

const getNextCheckpoint = async (user, treasure) => {
  try {
    const checks = await treasure.getCheckpoints().map(ch => ch.id)
    const userCheckpoints = await user.getUserCheckpoint().map(th => th.id)
    const checksLeft = await checks.filter( (el) => !userCheckpoints.includes(el))

    if (checksLeft.length === 0) {
      return FINAL_CHECKPOINT
    } else {
      return checksLeft[0]
    }
  } catch (e) {
    console.error(e)
    return SYSTEM_ERROR
  }
}

const checkIfCheckpointIsValid = async(user, checkpoint) => {
  try {
    const th = checkpoint.getTreasureHunt()

  } catch (e) {
    return INVALID_CHECKPOINT
  }
}

module.exports = {
  getNextCheckpoint,
  SYSTEM_ERROR,
  FINAL_CHECKPOINT,
  INVALID_CHECKPOINT
}

