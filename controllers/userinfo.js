'use strict'

let setUserInfo = function (req, res) {
  req.user.name = req.body.name
  req.user.address = req.body.address
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
