'use strict'
const sectionPriorities = require('../models/sectionPriorities')

const setSectionPriorities = function (req, res, next) {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    res.status(422).json({success: false, message: 'Missing parameters'})
  }

  sectionPriorities.setPrioritiesFor(req.user, req.body.sectionPriorities, function (err) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Priorities were not set'
      })
    }
    res.json({
      success: true,
      message: 'Priorities set successfully'
    })
  })
}

const getSectionPriorities = function (req, res, next) {
  sectionPriorities.getPrioritiesFor(req.user, function (err, sectionPriorities) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to get priorities'
      })
    }
    res.json({
      success: true,
      sectionPriorities: [sectionPriorities.prio1, sectionPriorities.prio2, sectionPriorities.prio3, sectionPriorities.prio4, sectionPriorities.prio5]
    })
  })
}

module.exports = {
  setSectionPriorities,
  getSectionPriorities
}
