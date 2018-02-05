'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sections', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameSv: Sequelize.STRING,
      nameEn: Sequelize.STRING,
      imageUrl: Sequelize.TEXT,
      textSv: Sequelize.TEXT,
      textEn: Sequelize.TEXT,
      longTextSv: Sequelize.TEXT,
      longTextEn: Sequelize.TEXT,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sections')
  }
}
