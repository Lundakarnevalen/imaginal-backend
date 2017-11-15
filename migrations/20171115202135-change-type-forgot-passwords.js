'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('ForgotPasswords',
      'email',
      {
        type: Sequelize.STRING
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ForgotPasswords')
  }
}
