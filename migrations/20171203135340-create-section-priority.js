'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SectionPriorities', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      section: {
        type: Sequelize.INTEGER
      },
      prio: {
        type: Sequelize.INTEGER
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
      // Sätta ihop det i ett many-to-many?
      /* .then(() => queryInterface.addConstraint('SectionPriorities', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'user_id',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'no action',
        onUpdate: 'no action'
      })) */
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SectionPriorities')
  }
}
