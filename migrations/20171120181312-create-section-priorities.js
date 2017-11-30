'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SectionPriorities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        unique: true
      },
      prio1: {
        type: Sequelize.STRING
      },
      prio2: {
        type: Sequelize.STRING
      },
      prio3: {
        type: Sequelize.STRING
      },
      prio4: {
        type: Sequelize.STRING
      },
      prio5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SectionPriorities')
  }
}
