'use strict'
const dbc = require('../config/database')
const Sequelize = require('sequelize')
const User = require('./users').User
const Section = require('./section').Section

const OK = 0
const LATE = 1
const DUPLICATE = 2
const NONUMBER = 3
const SERVERERROR = 4

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

const setSectionPriorities = async (user, sections) => {
  const lastDate = new Date('2018-03-05T03:24:00')
  if (Date.now() > lastDate.getTime()) {
    return LATE
  }

  if (!uniqueSections(sections)) {
    return DUPLICATE
  }
  let invalidNumber = false
  sections.forEach((sectionid, index) => {
    if (invalidNumber) { return }
    if (typeof (parseInt(sectionid)) !== 'number' || isNaN(parseInt(sectionid))) {
      invalidNumber = true
    }
  })

  if (invalidNumber) {
    return NONUMBER
  }

  try {
    await SectionPriority.destroy({
      where: {
        user_id: user.id
      }
    })
    await sections.forEach(async (sectionid, index) => {
      const section = parseInt(sectionid)
      await SectionPriority.create({
        user_id: user.id,
        section: parseInt(section),
        prio: index
      })
    })
  } catch (err) {
    return SERVERERROR
  }

  return OK
}

const getSectionPriorities = async (user) => {
  let prios = await SectionPriority.findAll({
    where: {
      user_id: user.id
    }
  })

  if (!prios) {
    return []
  }

  return prios.map(x => x.section)
}

const uniqueSections = function (array) {
  return (new Set(array)).size === array.length
}

module.exports = {
  SectionPriority,
  getSectionPriorities,
  setSectionPriorities,
  OK,
  LATE,
  DUPLICATE,
  NONUMBER,
  SERVERERROR
}
