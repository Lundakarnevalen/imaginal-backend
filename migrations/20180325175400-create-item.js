'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageUrl: Sequelize.TEXT,
      unit: Sequelize.STRING,
      purchasePrice: Sequelize.DOUBLE,
      salesPrice: Sequelize.DOUBLE,
      description: Sequelize.STRING,
      articleNumber: Sequelize.INTEGER,
      supplier: Sequelize.STRING,
      note: Sequelize.STRING,
      warningAmount: Sequelize.INTEGER,
      vat: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('Items')
  }
}
