'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        }
      },
      itemID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      quantity: Sequelize.INTEGER,
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
    await queryInterface.dropTable('OrderLines')
  }
}
