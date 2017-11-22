'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('UserRole', {
    UserId: DataTypes.STRING,
    RoleId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.UserRole.hasOne(User, {as: UserId, foreignKey: 'UserId'})
        models.UserRole.hasOne(Role, {as: RoleId, foreignKey: 'RoleId'})
      }
    }
  })
  return UserRole
}
