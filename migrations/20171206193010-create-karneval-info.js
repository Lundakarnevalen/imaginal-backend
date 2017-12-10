'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KarnevalInfos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    }).then(() => queryInterface.addConstraint('KarnevalInfos', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'Info must have user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KarnevalInfos')
  }
}
