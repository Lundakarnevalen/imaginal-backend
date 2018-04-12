'use strict'
module.exports = {
    up: async (quereryInterface, Sequelize) => {
        await quereryInterface.createTable('WarehouseUser', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            costBearerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'CostBearer',
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
        await quereryInterface.dropTable('WarehouseUser')
    }
}