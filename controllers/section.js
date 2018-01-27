'use strict'

const SectionPriorities = require('../models/sectionpriority')
const Sections = require('../models/section')
const Checkin = require('../models/checkin').Checkin

const setSectionPriorities = async (req, res, next) => {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    return res.status(400).json({success: false, message: 'Missing parameters'})
  }

  const checkedin = await Checkin.findOne({
    where: {userId: req.user.id}
  })

  if (!checkedin) {
    return res.status(400).json({success: false, message: 'Check in required'})
  }

  SectionPriorities.setSectionPriorities(req.user, req.body.sectionPriorities, function (err, success, message) {
    if (err) {
      return res.status(500).json({
        success,
        message
      })
    }
    if (success) {
      return res.json({
        success,
        message
      })
    } else {
      return res.status(400).json({
        success,
        message
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

const getAllSections = function (req, res, next) {
  Sections.Section.findAll()
    .then((sections) => {
      const sectionList = sections.map(section => {
        const sect = {}
        sect['id'] = section.id
        sect['nameSv'] = section.nameSv
        sect['nameEn'] = section.nameEv
        sect['imageUrl'] = section.imageUrl
        sect['textSv'] = section.textSv
        sect['textEn'] = section.textEn
        return sect
      })
      res.json({
        success: true,
        sections: sectionList
      })
    })
}

module.exports = {
  setSectionPriorities,
  getSectionPriorities,
  getAllSections
}
