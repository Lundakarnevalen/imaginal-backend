'use strict'
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('KarnevalistInfos', 'afMember', {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false})
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('KarnevalistInfos', 'afMember')
  }
}
