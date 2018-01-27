'use strict'
const dbc = require('../config/database')
const Sequelize = require('sequelize')
const User = require('./users').User
const Section = require('./section').Section

const SectionPriority = dbc.define('SectionPriority', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: Sequelize.INTEGER,
  section: Sequelize.INTEGER,
  prio: Sequelize.INTEGER
})

User.belongsToMany(Section, {
  through: {
    model: SectionPriority,
    unique: false
  },
  foreignKey: 'user_id',
  constraints: false
})

Section.belongsToMany(User, {
  through: {
    model: SectionPriority,
    unique: false
  },
  foreignKey: 'section',
  constraints: false
})

const setSectionPriorities = function (user, sections, done) {
  const lastDate = new Date(2020, 0, 0, 0, 0, 0, 0) // new Date(year, month, day, hours, minutes, seconds, milliseconds)
  if (Date.now() > lastDate.getTime()) {
    return done(null, false, 'Last date passed!')
  }

  if (uniqueSections(sections)) {
    return done(null, false, 'Duplicate sections!')
  }
  let invalidNumber = false
  sections.forEach((sectionid, index) => {
    if (invalidNumber) { return }
    if (typeof (parseInt(sectionid)) !== 'number' || isNaN(parseInt(sectionid))) {
      invalidNumber = true
    }
  })

  if (invalidNumber) {
    return done(null, false, 'Invalid sectionid')
  }

  SectionPriority.destroy({
    where: {
      user_id: user.id
    }
  }).then(() => sections.forEach((sectionid, index) => {
    const section = parseInt(sectionid)
    SectionPriority.create({
      user_id: user.id,
      section: parseInt(section),
      prio: index
    })
  })).then((priority) => {
    return done(null, true, 'Priorities set')
  })
}

const getSectionPriorities = function (user, done) {
  SectionPriority.findAll({
    where: {
      user_id: user.id
    }
  }).then(prios => {
    if (!prios) {
      return done(null, null)
    } else {
      return done(null, prios.map(x => x.section))
    }
  })
}

const uniqueSections = function (array) {
  return (new Set(array)).size !== array.length
}

module.exports = {
  SectionPriority,
  getSectionPriorities,
  setSectionPriorities
}
