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
      creationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      storageLocationID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'StorageLocation',
          key: 'id'
        }
      },
      deliveryDate: Sequelize.DATE,
      returnDate: Sequelize.DATE,
      delivered: Sequelize.BOOLEAN,
      return: Sequelize.BOOLEAN
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders')
  }
}
