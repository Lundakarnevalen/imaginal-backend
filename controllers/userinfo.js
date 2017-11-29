'use strict'

let setUserInfo = function (req, res) {
  if (req.body.name) req.user.name = req.body.name
  if (req.body.phoneNumber) req.user.phoneNumber = req.body.phoneNumber
  if (req.body.address) req.user.address = req.body.address
  if (req.body.postNumber) req.user.postNumber = req.body.postNumber
  if (req.body.city) req.user.city = req.body.city
  if (req.body.careOf) req.user.careOf = req.body.careOf
  if (req.body.personalNumber) req.user.personalNumber = req.body.personalNumber
  req.user.save().then(() => {
    res.json({
      success: true,
      message: 'User info updated'
    })
  })
}

module.exports = {
  setUserInfo
}
