'use strict'

const Sequelize = require('sequelize')
const dbc = require('../config/database')

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
    const lastDate = new Date(2020, 0, 0, 0, 0, 0, 0) // new Date(year, month, day, hours, minutes, seconds, milliseconds)
    if (Date.now() > lastDate.getTime()) {
      done(null, false)
    }
    if (!user) {
      done('No user found', false)
    }
    if (!sectionPriority) {
      SectionPriority.create(values)
    } else {
      sectionPriority.update(values)
    }
    done(null, true)
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
