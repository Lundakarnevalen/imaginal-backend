'use strict'
const dbc = require('../config/database')
const Sequelize = require('sequelize')

const KarnevalInfo = dbc.define('KarnevalInfo', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: Sequelize.INTEGER,
  language: Sequelize.STRING,
  driversLicense: Sequelize.STRING,
  foodPreference: Sequelize.STRING,
  disability: Sequelize.STRING,
  audition: Sequelize.STRING,
  talent: Sequelize.STRING,
  entertainmentCategory: Sequelize.STRING,
  corps: Sequelize.STRING,
  startOfStudies: Sequelize.STRING,
  pastInvolvement: Sequelize.STRING,
  groupLeader: Sequelize.STRING,
  interests: Sequelize.STRING,
  misc: Sequelize.STRING,
  plenipotentiary: Sequelize.STRING
})

module.exports = {
  KarnevalistInfo: KarnevalInfo
}
