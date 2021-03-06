'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [{
      name: 'karnevöl',
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
      vat: 0.0,
      costNr: 'inköp'
    }], {})
    await queryInterface.bulkInsert('Items', [{
      name: 'karnevöl1',
      imageUrl: 'hej.se',
      unit: 'burk',
      purchasePrice: 10,
      salesPrice: 10,
      description: 'fin öl',
      articleNumber: 123457,
      supplier: 'systemet',
      note: 'hoppas på detta',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10),
      vat: 0.0,
      costNr: 'krök'
    }], {})
    await queryInterface.bulkInsert('Items', [{
      name: 'karnevöl2',
      imageUrl: 'hej.se',
      unit: 'burk',
      purchasePrice: 10,
      salesPrice: 10,
      description: 'fin öl',
      articleNumber: 123458,
      supplier: 'systemet',
      note: 'hoppas på detta',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10),
      vat: 0.0,
      costNr: 'försäljning'
    }], {})

    await queryInterface.bulkInsert('Items', [{
      name: 'karnevöl3',
      imageUrl: 'hej.se',
      unit: 'burk',
      purchasePrice: 10,
      salesPrice: 10,
      description: 'fin öl',
      articleNumber: 123459,
      supplier: 'systemet',
      note: 'hoppas på detta',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10),
      vat: 0.0,
      costNr: 'svinn'
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
