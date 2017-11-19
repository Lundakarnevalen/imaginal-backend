'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Role.belongsToMany(models.User, {through: 'UserRoles'});
      }
    }
  });
  return Role;
};