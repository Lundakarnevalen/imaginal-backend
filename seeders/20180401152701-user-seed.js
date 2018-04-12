'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 15000,
      email: 'warehousecustomer@lundakarnevalen.se',
      firstName: 'saknas',
      lastName: 'saknas',
      phoneNumber: 'saknas',
      address: 'saknas',
      postNumber: 'saknas',
      city: 'saknas',
      careOf: 'saknas',
      personalNumber: 'saknas',
      password: '$2a$10$HEbL5HaUXdD3ZnUDhQnMYueuW3n4v92aPs4imN.FlRD/on4DI/55e',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhcmVob3VzZWN1c3RvbWVyQGx1bmRha2FybmV2YWxlbi5zZSIsImlhdCI6MTUyMzUyNzc2NH0.ZgVPSR3INKYLuIde1UfB7TfZ_6b1vYMdIu2q1xhVpF0',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 15000,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('Users', [{
      id: 15001,
      email: 'warehouseworker@lundakarnevalen.se',
      firstName: 'saknas',
      lastName: 'saknas',
      phoneNumber: 'saknas',
      address: 'saknas',
      postNumber: 'saknas',
      city: 'saknas',
      careOf: 'saknas',
      personalNumber: 'saknas',
      password: '$2a$10$HEbL5HaUXdD3ZnUDhQnMYueuW3n4v92aPs4imN.FlRD/on4DI/55e',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhcmVob3VzZXdvcmtlckBsdW5kYWthcm5ldmFsZW4uc2UiLCJpYXQiOjE1MjM1Mjc4MTJ9.sXerQusL9Go8_JjcvdxaPcrS2nw6ZKpvjt8CEBi-y_o',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 15001,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('Users', [{
      id: 15002,
      email: 'warehousemanager@lundakarnevalen.se',
      firstName: 'saknas',
      lastName: 'saknas',
      phoneNumber: 'saknas',
      address: 'saknas',
      postNumber: 'saknas',
      city: 'saknas',
      careOf: 'saknas',
      personalNumber: 'saknas',
      password: '$2a$10$HEbL5HaUXdD3ZnUDhQnMYueuW3n4v92aPs4imN.FlRD/on4DI/55e',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhcmVob3VzZW1hbmFnZXJAbHVuZGFrYXJuZXZhbGVuLnNlIiwiaWF0IjoxNTIzNTI3ODYxfQ.X8k0QgVQcFmyDQCT0fdT55tZUZdV_P0Eh4RiZmcCgBk',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('KarnevalistInfos', [{
      userId: 15002,
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
