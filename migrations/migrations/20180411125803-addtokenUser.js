'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'pushToken', Sequelize.TEXT)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'pushToken')
  }
}
