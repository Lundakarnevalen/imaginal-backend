'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      id: 100,
      description: 'warehouse customer',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Roles', [{
      id: 101,
      description: 'warehouse worker',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Roles', [{
      id: 102,
      description: 'warehouse manager',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
