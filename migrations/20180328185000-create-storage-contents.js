'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StorageContents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storageLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StorageLocations',
          key: 'id'
        }
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StorageContents')
  }
}
