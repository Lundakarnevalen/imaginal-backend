'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KarnevalistInfos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      language: Sequelize.STRING,
      driversLicense: Sequelize.STRING,
      foodPreference: Sequelize.TEXT,
      disability: Sequelize.TEXT,
      corps: Sequelize.STRING,
      startOfStudies: Sequelize.TEXT,
      pastInvolvement: Sequelize.TEXT,
      groupLeader: Sequelize.BOOLEAN,
      misc: Sequelize.TEXT,
      plenipotentiary: Sequelize.BOOLEAN,
      bff: Sequelize.TEXT,
      studentNation: Sequelize.STRING,
      UserId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        }
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
    return queryInterface.dropTable('KarnevalistInfos')
  }
}
