'use strict'
module.exports = {
    up: async (quereryInterface, Sequelize) => {
        await quereryInterface.createTable('CostBearer', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
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
        await quereryInterface.dropTable('CostBearer')
    }
}