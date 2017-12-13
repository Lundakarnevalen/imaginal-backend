'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const type = { type: Sequelize.STRING, allowNull: false }

    await queryInterface.addColumn(
      'Users',
      'firstName',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'lastName',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'phoneNumber',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'address',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'postNumber',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'city',
      type
    )

    await queryInterface.addColumn(
      'Users',
      'careOf',
      type
    )

    return queryInterface.addColumn(
      'Users',
      'personalNumber',
      type
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'firstName')
    await queryInterface.removeColumn('Users', 'lastName')
    await queryInterface.removeColumn('Users', 'address')
    await queryInterface.removeColumn('Users', 'postNumber')
    await queryInterface.removeColumn('Users', 'city')
    await queryInterface.removeColumn('Users', 'careOf')
    return queryInterface.removeColumn('Users', 'personalNumber')
  }
}
