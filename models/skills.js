const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User

const Skills = dbc.define('Skills', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  skill: Sequelize.TEXT
})

// This adds UserId to KarnevalistInfo as foreign key

User.hasMany(Skills, {as: 'UserSkill', foreignKey: 'userId'})

module.exports = {
  Skills
}
