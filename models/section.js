'use strict'

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    name: {
      primaryKey: true,
      type: sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {}
    }
  })
  return Section
}
