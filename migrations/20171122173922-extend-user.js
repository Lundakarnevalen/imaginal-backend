'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const type = { type: Sequelize.STRING, allowNull: false }

    await queryInterface.addColumn(
      'Users',
      'name',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'address',
      type
    )

    return queryInterface.addColumn(
      'Users',
      'personalNumber',
      type
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'name')
    await queryInterface.removeColumn('Users', 'address')
    return queryInterface.removeColumn('Users', 'personalNumber')
  }
}
