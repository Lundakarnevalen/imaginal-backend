'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ItemTags', {
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      roleid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        }
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ItemTags')
  }
}
