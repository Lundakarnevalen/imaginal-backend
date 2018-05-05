'use strict'
module.exports = {
  up: async (quereryInterface, Sequelize) => {
    await quereryInterface.createTable('WarehouseUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      costBearerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CostBearers',
          key: 'id'
        }
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
  down: async (quereryInterface, Sequelize) => {
    await quereryInterface.dropTable('WarehouseUsers')
  }
}
