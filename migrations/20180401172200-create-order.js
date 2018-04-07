'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storageLocationID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StorageLocations',
          key: 'id'
        }
      },
      deliveryDate: Sequelize.DATE,
      returnDate: Sequelize.DATE,
      delivered: Sequelize.BOOLEAN,
      return: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Orders')
  }
}
