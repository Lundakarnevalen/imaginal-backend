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
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGx1bmRha2FybmV2YWxlbi5zZSIsImlhdCI6MTUxNzg2MzM0MH0.sTXMU6V2elo9kxTe-W8bd9KAT0XfR8_qFlZdBD9emMM',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 1,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('Users', [{
      email: 'apple@apple.com',
      firstName: 'saknas',
      lastName: 'saknas',
      phoneNumber: 'saknas',
      address: 'saknas',
      postNumber: 'saknas',
      city: 'saknas',
      careOf: 'saknas',
      personalNumber: 'saknas',
      password: '$2a$10$PFVCTETqQK3YCGukxs58SO3fZaSsgUPPgGON5pAhJyYcMvccSobdy',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 2,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('KarnevalistInfos', null, {})

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
