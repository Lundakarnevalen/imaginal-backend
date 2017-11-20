'use strict'

const Sequelize = require('sequelize')
const dbc = require('../config/database').dbc

const SectionPriority = dbc.define('SectionPriority', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userID: Sequelize.INTEGER,
  prio1: Sequelize.STRING,
  prio2: Sequelize.STRING,
  prio3: Sequelize.STRING,
  prio4: Sequelize.STRING,
  prio5: Sequelize.STRING
})

const setPrioritiesFor = function (user, sectionPriority, done) {
  const values = {
    userID: user.id,
    prio1: sectionPriority[0],
    prio2: sectionPriority[1],
    prio3: sectionPriority[2],
    prio4: sectionPriority[3],
    prio5: sectionPriority[4]
  }
  SectionPriority.findOne({where: {userID: user.id}}).then(function (sectionPriority) {
    if (!sectionPriority) {
      SectionPriority.create(values)
    } else {
      SectionPriority.update(values)
    }
  })
}

const getPrioritiesFor = function (user, done) {
  SectionPriority.findOne({where: {userID: user.id}}).then(function (sectionPriority) {
    done(null, sectionPriority)
  })
}

module.exports = {
  SectionPriority,
  setPrioritiesFor,
  getPrioritiesFor
}
