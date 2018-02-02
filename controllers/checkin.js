const Checkin = require('../models/checkin').Checkin
const User = require('../models/users').User
const UserRoles = require('../models/userrole')

/**
 * checkIn checks in a user with req.user.
 * @param {String} req.params.identification - email or personalNumber of the user to check in.
 *
 */
const checkIn = async (req, res) => {
  if (!req.params.identification) {
    return res.status(400).json({
      success: false,
      message: 'Missing identification parameter'
    })
  }

  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Admin privileges required'
    })
  }

  // Find the user to check in
  const user = await User.findOne({
    where: {
      $or: [
        {personalNumber: req.params.identification},
        {email: req.params.identification}
      ]
    }
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      message: `No user with PN or email '${req.params.identification}' found`
    })
  }

  // Check if checkin already exists
  const existningCheckin = await Checkin.findOne({where: {userId: user.id}})
  if (existningCheckin) {
    return res.status(400).json({
      success: false,
      message: `User with id ${user.id} is already checked in`
    })
  }

  try {
    const checkIn = await Checkin.create()

    // The user to be checked in is assigned a checkin object
    await user.setCheckin(checkIn)

    // The user that checks in the other is set as the owner
    await req.user.setCheckinOwnership(checkIn)

    // Save the updated models
    await user.save()
    await req.user.save()
  } catch (err) {
    console.error('Error when creating a checkin. Error: ', err)
    return res.status(400).json({
      success: false,
      message: 'Error when checking in the user.'
    })
  }

  return res.json({
    success: true,
    message: `Successfully checked in ${user.email}`
  })
}

/**
 * checkStatus retrieves the check in status of the specified user.
 * @param {*} req.params.email - Email of the user to check.
 */
const checkStatus = async (req, res) => {
  const email = req.params.email

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Missing email parameter'
    })
  }

  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

  if (!isAdmin && email !== req.user.email) {
    return res.status(401).json({
      success: false,
      message: 'Admin privileges required to check another user\'s status'
    })
  }

  const user = await User.findOne({where: {email: email}})
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'No such user'
    })
  }

  const checkIn = await Checkin.findOne({
    where: {userId: user.id},
    attributes: ['checkerId', 'userId', 'createdAt']
  })

  return res.json({
    success: true,
    checkedIn: !!checkIn,
    checkInInfo: checkIn || 'No info if not checked in'
  })
}

/**
 * listCheckins retrives all check ins made by the specified user.
 * @param {*} req.params.email - The user's email
 */
const listCheckins = async (req, res) => {
  if (!req.params.email) {
    return res.status(400).json({
      success: false,
      message: 'Missing email parameter'
    })
  }

  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Admin privileges required'
    })
  }

  const user = await User.findOne({where: {email: req.params.email}})
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'No such user'
    })
  }

  const checkIns = await Checkin.findAll({
    where: {checkerId: user.id},
    attributes: ['createdAt', 'userId']
  })

  return res.json({
    success: true,
    checkerId: user.id,
    checkIns
  })
}

module.exports = {
  checkIn,
  checkStatus,
  listCheckins
}
