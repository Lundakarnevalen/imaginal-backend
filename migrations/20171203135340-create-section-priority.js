'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SectionPriorities', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: Sequelize.INTEGER,
      section: Sequelize.STRING,
      prio: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('SectionPriorities', ['id'], {
      type: 'FOREIGN KEY',
      name: 'user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SectionPriorities')
  }
}
