'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const strType = { type: Sequelize.STRING, allowNull: false }
    return queryInterface.createTable('KarnevalInfo', {
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
        strType
      },
      driversLicense: {
        strType
      },
      foodPreference: {
        strType
      },
      disability: {     //funktionsvariation
        strType
      },
      audition: {
        strType
      },
      talent: {
        strType
      },
      entertainmentCategory: {
        strType
      },
      corps: {
        strType
      },
      startOfStudies: {
        strType
      },
      pastInvolvement: {
        strType
      },
      groupLeader: {
        strType
      },
      interests: {
        strType
      },
      misc: {
        strType
      },
      plenipotentiary: {
        strType
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }).then(() => queryInterface.addConstraint('KarnevalInfo', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'user_id',
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
    return queryInterface.dropTable('KarnevalInfo')
  }
}