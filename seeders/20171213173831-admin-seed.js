'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@lundakarnevalen.se',
      firstName: 'saknas',
      lastName: 'saknas',
      phoneNumber: 'saknas',
      address: 'saknas',
      postNumber: 'saknas',
      city: 'saknas',
      careOf: 'saknas',
      personalNumber: 'saknas',
      password: '$2a$10$HEbL5HaUXdD3ZnUDhQnMYueuW3n4v92aPs4imN.FlRD/on4DI/55e',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 1,
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
    return queryInterface.bulkDelete('Users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
