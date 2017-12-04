const SectionPriorities = require('../models/sectionPriority')

const setSectionPriorities = function (req, res, next) {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    res.status(422).json({success: false, message: 'Missing parameters'})
  }

  SectionPriorities.setSectionPriorities(req.user, req.body.sectionPriorities, function (err, success) {
    if (err) {
      return res.status(500).json({
        success,
        message: 'Priorities were not set',
        err
      })
    }
    if (success) {
      return res.json({
        success,
        message: 'Priorities set successfully'
      })
    } else {
      return res.status(400).json({
        success,
        message: 'Priorities can no longer be set'
      })
    }
  })
}

const getSectionPriorities = function (req, res, next) {
  SectionPriorities.getSectionPriorities(req.user, function (err, sectionPriorities) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to get priorities',
        err
      })
    }
    res.json({
      success: true,
      sectionPriorities
    })
  })
}

module.exports = {
  setSectionPriorities,
  getSectionPriorities
}
