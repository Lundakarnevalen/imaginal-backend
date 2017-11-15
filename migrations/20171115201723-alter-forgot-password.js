'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('ForgotPasswords',
      'userid',
      'email'
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ForgotPasswords')
  }
}
