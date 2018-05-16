'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Events',
      [
        {
          name: 'Awesome sittning',
          startDateTime: '2018-06-01 20:00:00',
          nbrSeats: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gris',
          startDateTime: '2018-06-02 21:00:00',
          nbrSeats: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
    await queryInterface.bulkInsert(
      'EventTimeslots',
      [
        {
          startDateTime: '2018-06-01 20:00:00',
          duration: 120,
          guestDuration: 105,
          createdAt: new Date(),
          updatedAt: new Date(),
          eventId: 1
        },
        {
          startDateTime: '2018-06-01 22:00:00',
          duration: 120,
          guestDuration: 105,
          createdAt: new Date(),
          updatedAt: new Date(),
          eventId: 1
        },
        {
          startDateTime: '2018-06-02 20:00:00',
          duration: 120,
          guestDuration: 105,
          createdAt: new Date(),
          updatedAt: new Date(),
          eventId: 2
        },
        {
          startDateTime: '2018-06-02 22:00:00',
          duration: 120,
          guestDuration: 105,
          createdAt: new Date(),
          updatedAt: new Date(),
          eventId: 2
        }
      ],
      {}
    )
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
