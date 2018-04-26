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
      storageLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StorageLocations',
          key: 'id'
        }
      },
      warehouseUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'WarehouseUsers',
          key: 'id'
        }
      },
      orderDeliveryDate: Sequelize.DATE,
      checkedOut: Sequelize.BOOLEAN,
      checkedOutDate: Sequelize.DATE,
      return: Sequelize.BOOLEAN,
      returnDate: Sequelize.DATE,
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
