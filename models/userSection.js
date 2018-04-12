'use strict'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
    model: UserSection,
    unique: false
  },
  foreignKey: 'userId',
  constraints: false
})

Section.belongsToMany(User, {
  through: {
    model: UserSection,
    unique: false
  },
  foreignKey: 'sectionId',
  constraints: false
})

/** Finds all sections of a user. */
const findSectionsOfUser = async function (user) {
  // Fetch all usersections for the user.
  const usersections = await UserSection.findAll({
    where: { userId: user.id },
    attributes: ['sectionId']
  })

  // Convert the usersection-objects to the sectionid.
  const sectionIds = usersections.map(s => s.sectionId)

  // Find all sections
  // Op.or is the OR operator for sequelize. Read more at:
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#basics
  const sections = await Section.findAll({
    where: {
      id: { [Op.or]: sectionIds }
    }
  })
  return sections
}

module.exports = {
  UserSection,
  findSectionsOfUser
}
