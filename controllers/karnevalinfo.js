'use strict'

const karnevalInfo = require('../models/karnevalinfo')

let setKarnevalInfo = function (req,res) {
  karnevalInfo.KarnevalInfo.findOne({
    where: {user_id: req.user.user_id}
  }).then((entry) =>{
    if(req.body.language) entry.language=req.body.language
    if(req.body.driversLicense) entry.driversLicense=req.body.driversLicense
    if(req.body.foodPreference) entry.foodPreference=req.body.foodPreference
    if(req.body.disability) entry.disability=req.body.disability
    if(req.body.audition) entry.audition=req.body.audition
    if(req.body.talent) entry.talent=req.body.talent
    if(req.body.entertainmentCategory) entry.entertainmentCategory=req.body.entertainmentCategory
    if(req.body.corps) entry.corps=req.body.corps
    if(req.body.startOfStudies) entry.startOfStudies=req.body.startOfStudies
    if(req.body.pastInvolvement) entry.pastInvolvement=req.body.pastInvolvement
    if(req.body.groupLeader) entry.groupLeader=req.body.groupLeader
    if(req.body.interests) entry.interests=req.body.interests
    if(req.body.misc) entry.misc=req.body.misc
    if(req.body.plenipotentiary) entry.plenipotentiary=req.body.plenipotentiary
    entry.save().then(() => {
      res.json({
        success: true,
        message: 'Karneval info updated'
      })
    })
  })
  
}

module.exports = {
  setKarnevalInfo
}