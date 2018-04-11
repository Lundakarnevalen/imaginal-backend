'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [{
      itemName: 'karnevöl',
      imageUrl: 'hej.se',
      unit: 'burk',
      purchasePrice: 10,
      salesPrice: 10,
      description: 'fin öl',
      articleNumber: 123456,
      supplier: 'systemet',
      note: 'hoppas på detta',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10),
      vat: 0.0
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
    return queryInterface.bulkDelete('Items', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
