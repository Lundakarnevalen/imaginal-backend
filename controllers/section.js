'use strict'
const SectionPriorities = require('../models/sectionPriorities')

const setSectionPriorities = function (req, res, next) {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    res.status(422).json({success: false, message: 'Missing parameters'})
  }

  SectionPriorities.setPrioritiesFor(req.user, req.body.sectionPriorities, function (err, success) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Priorities were not set'
      })
    }
    if (success) {
      return res.json({
        success,
        message: 'Priorities set successfully'
      })
    } else {
      return res.status(403).json({
        success,
        message: 'Priorities can no longer be set'
      })
    }
  })
}

const getSectionPriorities = function (req, res, next) {
  SectionPriorities.getPrioritiesFor(req.user, function (err, sectionPriorities) {
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
