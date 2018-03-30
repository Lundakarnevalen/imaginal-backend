'use strict'

const SectionPriorities = require('../models/sectionpriority')
const Sections = require('../models/section')
const Checkin = require('../models/checkin').Checkin

const setSectionPriorities = async (req, res, next) => {
  if (!req.body.sectionPriorities || !Array.isArray(req.body.sectionPriorities)) {
    return res.status(400).json({
      success: false,
      message: 'Missing parameters'
    })
  }

  const checkedin = await Checkin.findOne({
    where: {userId: req.user.id}
  })

  if (!checkedin) {
    return res.status(400).json({
      success: false,
      message: 'Check in required'
    })
  }

  let result = await SectionPriorities.setSectionPriorities(req.user, req.body.sectionPriorities)
  let status = 200
  let success = true
  let message = 'Sections set'
  switch (result) {
    case SectionPriorities.OK:
      break
    case SectionPriorities.LATE:
      status = 418 // I'm a teapot
      success = false
      message = 'Last date has passed'
      break
    case SectionPriorities.DUPLICATE:
      status = 400
      success = false
      message = 'Cannot send duplicate values'
      break
    case SectionPriorities.NONUMBER:
      status = 400
      success = false
      message = 'Invalid section types, must be numbers'
      break
    default:
      status = 500
      success = false
      message = 'Failed to set section priorities'
  }
  res.status(status).json({
    success,
    message
  })
}

const getSectionPriorities = async (req, res, next) => {
  try {
    let sectionPriorities = await SectionPriorities.getSectionPriorities(req.user)
    res.json({
      success: true,
      sectionPriorities
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch section priorities'
    })
  }
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
        sect['longTextSv'] = section.longTextSv
        sect['longTextEn'] = section.longTextEn

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
