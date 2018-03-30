const User = require('../users/users').User
const jwt = require('jsonwebtoken')

const createUser = async(req, t) => {
  const token = await jwt.sign({email: req.body.email}, process.env.TOKEN_SECRET || 'secret')
  const user = await User.create({
    email: req.body.email,
    phoneNumber: req.body.phoneNumber || '',
    firstName: req.body.firstName || '',
    lastName: req.body.lastName || '',
    address: req.body.address || '',
    postNumber: req.body.postNumber || '',
    city: req.body.city || '',
    careOf: req.body.careOf || '',
    personalNumber: req.body.personalNumber || '',
    shirtSize: req.body.shirtSize || '',
    token
  })

  await user.createKarnevalistInfo({
    language: req.body.language || '',
    driversLicense: req.body.driversLicense || '',
    foodPreference: req.body.foodPreference || '',
    disability: req.body.disability || '',
    audition: req.body.audition || '',
    corps: req.body.corps || '',
    startOfStudies: req.body.startOfStudies || '',
    pastInvolvement: req.body.pastInvolvement || '',
    groupLeader: req.body.groupLeader || false,
    misc: req.body.misc || '',
    plenipotentiary: req.body.plenipotentiary || false,
    bff: req.body.bff || '',
    studentNation: req.body.studentNation || ''
  }, {t})

  return user
}

module.exports = {
  createUser
}
