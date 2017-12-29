'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KarnevalistInfos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
      },
      driversLicense: {
        type: Sequelize.STRING
      },
      foodPreference: {
        type: Sequelize.STRING
      },
      disability: {     // funktionsvariation
        type: Sequelize.STRING
      },
      audition: {
        type: Sequelize.STRING
      },
      talent: {
        type: Sequelize.STRING
      },
      entertainmentCategory: {
        type: Sequelize.STRING
      },
      corps: {
        type: Sequelize.STRING
      },
      startOfStudies: {
        type: Sequelize.STRING
      },
      pastInvolvement: {
        type: Sequelize.STRING
      },
      groupLeader: {
        type: Sequelize.STRING
      },
      interests: {
        type: Sequelize.STRING
      },
      misc: {
        type: Sequelize.STRING
      },
      plenipotentiary: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KarnevalistInfos')
  }
}
