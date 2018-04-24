'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [{
      storageLocationId: 1,
      warehouseUserId: 1,
      orderDeliveryDate: '2018-04-13 00:00:00',
      checkedOut: false,
      checkedOutDate: null,
      return: false,
      returnDate: null,
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
    await queryInterface.bulkInsert('Orders', [{
      storageLocationId: 1,
      warehouseUserId: 1,
      orderDeliveryDate: '2018-04-13 00:00:00',
      checkedOut: false,
      checkedOutDate: null,
      return: false,
      returnDate: null,
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
    return queryInterface.bulkDelete('Orders', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
