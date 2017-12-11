'use strict'
const dbc = require('../config/database')
const Sequelize = require('sequelize')

const SectionPriority = dbc.define('SectionPriority', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: Sequelize.INTEGER,
  section: Sequelize.STRING,
  prio: Sequelize.INTEGER
})

const setSectionPriorities = function (user, sectionPriorities, done) {
  const lastDate = new Date(2020, 0, 0, 0, 0, 0, 0) // new Date(year, month, day, hours, minutes, seconds, milliseconds)
  if (Date.now() > lastDate.getTime()) {
    return done(null, false, 'Last date passed!')
  }

  if (uniqueSections(sectionPriorities)) {
    return done(null, false, 'Duplicate sections!')
  }

  SectionPriority.destroy({
    where: {
      user_id: user.id
    }
  }).then(() => sectionPriorities.forEach((currentValue, index) => SectionPriority.create({user_id: user.id, section: currentValue, prio: index})))
  return done(null, true, 'Priorities set')
}

const getSectionPriorities = function (user, done) {
  SectionPriority.findAll({
    where: {
      user_id: user.id
    }
  }).then(prios => done(null, makeSendablePrios(prios)))
}

const uniqueSections = function (array) {
  return (new Set(array)).size !== array.length
}

const makeSendablePrios = function (prios) {
  return prios[0].section.split(',')
}

module.exports = {
  SectionPriority,
  getSectionPriorities,
  setSectionPriorities
}
