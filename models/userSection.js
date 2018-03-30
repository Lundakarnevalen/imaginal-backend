'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User
const Section = require('./section').Section

const UserSection = dbc.define('UserSection', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER
  },
  sectionId: {
    type: Sequelize.INTEGER
  }
})

User.belongsToMany(Section, {
  through: {
    model: User,
    unique: false
  },
  foreignKey: 'userId',
  constraints: false
})

Section.belongsToMany(User, {
  through: {
    model: Section,
    unique: false
  },
  foreignKey: 'sectionId',
  constraints: false
})

module.exports = {
  UserSection,
}
