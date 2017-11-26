'use strict'

let setUserInfo = function (req, res) {
  req.user.name = req.body.name
  req.user.phoneNumber = req.body.phoneNumber
  req.user.address = req.body.address
  req.user.postNumber = req.body.postNumber
  req.user.city = req.body.city
  req.user.careOf = req.body.careOf
  req.user.personalNumber = req.body.personalNumber
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
