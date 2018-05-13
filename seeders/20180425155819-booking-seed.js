'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Bookings',
      [
        {
          name: 'John Doe',
          nbrGuests: 5,
          eventTimeslotId: 1,
          uuid: '416ac246-e7ac-49ff-93b4-f7e94d997e6b',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
