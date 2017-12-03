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
    return done(null, false)
  }

  if (isValidPrioArray(sectionPriorities)) {
    return done('Invalid array!', false)
  }

  SectionPriority.destroy({
    where: {
      user_id: user.id
    }
  }).then(() => sectionPriorities.forEach((currentValue, index) => SectionPriority.create({user_id: user.id, section: currentValue, prio: index})))
  return done(null, true)
}

const getSectionPriorities = function (user, done) {
  SectionPriority.findAll({
    where: {
      user_id: user.id
    }
  }).then(prios => done(null, prios.reduce(flatten, [])))
}

const isValidPrioArray = function (array, callback) {
  if (Array.isArray(array)) {
    return (new Set(array)).size !== array.length
  }
  return false
}

const flatten = function (acc, cVal, cInd, arr){
  acc.push(cVal.section)
  return acc
}

module.exports = {
  SectionPriority,
  getSectionPriorities,
  setSectionPriorities
}
