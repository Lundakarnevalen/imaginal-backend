'use strict'

let setKarnevalInfo = function (req,res) {
  //const karnevalInfo.find(where user id ? w)
  if(req.body.language) req.user.language=req.body.language
  if(req.body.driversLicense) req.user.driversLicense=req.body.driversLicense
  if(req.body.foodPreference) req.user.foodPreference=req.body.foodPreference
  if(req.body.disability) req.user.disability=req.body.disability
  if(req.body.audition) req.user.audition=req.body.audition
  if(req.body.talent) req.user.talent=req.body.talent
  if(req.body.entertainmentCategory) req.user.entertainmentCategory=req.body.entertainmentCategory
  if(req.body.corps) req.user.corps=req.body.corps
  if(req.body.startOfStudies) req.user.startOfStudies=req.body.startOfStudies
  if(req.body.pastInvolvement) req.user.pastInvolvement=req.body.pastInvolvement
  if(req.body.groupLeader) req.user.groupLeader=req.body.groupLeader
  if(req.body.interests) req.user.interests=req.body.interests
  if(req.body.misc) req.user.misc=req.body.misc
  if(req.body.plenipotentiary) req.user.plenipotentiary=req.body.plenipotentiary
}