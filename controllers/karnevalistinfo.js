'use strict'

const karnevalistInfo = require('../models/karnevalistinfo')

const setKarnevalistInfo = function (req, res) {
  karnevalistInfo.KarnevalistInfo.findOne({
    where: {user_id: req.user.id}
  }).then((entry) => {
    if (req.body.language) entry.language = req.body.language
    if (req.body.driversLicense) entry.driversLicense = req.body.driversLicense
    if (req.body.foodPreference) entry.foodPreference = req.body.foodPreference
    if (req.body.disability) entry.disability = req.body.disability
    if (req.body.audition) entry.audition = req.body.audition
    if (req.body.corps) entry.corps = req.body.corps
    if (req.body.startOfStudies) entry.startOfStudies = req.body.startOfStudies
    if (req.body.pastInvolvement) entry.pastInvolvement = req.body.pastInvolvement
    if (req.body.groupLeader) entry.groupLeader = req.body.groupLeader
    if (req.body.misc) entry.misc = req.body.misc
    if (req.body.plenipotentiary) entry.plenipotentiary = req.body.plenipotentiary
    if (req.body.bff) entry.bff = req.body.bff
    if (req.body.studentNation) entry.studentNation = req.body.studentNation
    entry.save().then(() => {
      res.json({
        success: true,
        message: 'Karnevalist info updated'
      })
    })
  })
}

const getKarnevalistInfo = function (req, res) {
  karnevalistInfo.KarnevalistInfo.findOne({
    where: {user_id: req.user.id}
  }).then(info => {
    res.json(
      info.dataValues
    )
  })
}

module.exports = {
  setKarnevalistInfo,
  getKarnevalistInfo
}
