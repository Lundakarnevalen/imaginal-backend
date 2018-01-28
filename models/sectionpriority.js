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

const setSectionPriorities = async (user, sections) => {
  const lastDate = new Date('2018-02-05T03:24:00')
  if (Date.now() > lastDate.getTime()) {
    return 1
  }

  if (uniqueSections(sections)) {
    return 2
  }
  let invalidNumber = false
  sections.forEach((sectionid, index) => {
    if (invalidNumber) { return }
    if (typeof (parseInt(sectionid)) !== 'number' || isNaN(parseInt(sectionid))) {
      invalidNumber = true
    }
  })

  if (invalidNumber) {
    return 3
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
    return 4
  }

  return 0
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
  return (new Set(array)).size !== array.length
}

module.exports = {
  SectionPriority,
  getSectionPriorities,
  setSectionPriorities
}
