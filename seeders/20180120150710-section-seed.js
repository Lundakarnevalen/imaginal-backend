'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sections', [{
      name: 'Administeriet',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Biljonsen',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Blädderiet',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Dansen',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Ekonomi',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Fabriken',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Festmästeriet',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Kommunikationen',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Mediahuset',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Musiken',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Nöjessektionerna',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Områdessektionerna',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Produktsektionerna',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Säkerhetssektionen',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Tågsektionerna',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})

    await queryInterface.bulkInsert('Sections', [{
      name: 'Vieriet',
      createdAt: new Date().toISOString().substr(0, 10),
      updatedAt: new Date().toISOString().substr(0, 10)
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sections', null, {})
  }
}
