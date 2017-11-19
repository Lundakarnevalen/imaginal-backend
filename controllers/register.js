const sequelize = require('../config/database.js').dbc
const User = require('../models').User;
const Role = require('../models').Role;
const bcrypt = require('bcrypt')

let registerUser = function (req, res) {
  // 10 rounds used for salt, needs to be tested and optimized
  let finalUser;
  let finalRole;
  let roleDescription = 'Karnevalist';

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      throw err
    }
    sequelize.sync() //promise chain https://developers.google.com/web/fundamentals/primers/promises
    .then(() => User.create({
      email: req.body.email,
      password: hash,
      token: 'temporary token'
    }))
    .then(user => {
      finalUser = user;
    })
    .then(() => Role.create({
      description: roleDescription
    }))
    .then(role => {
      finalRole = role;
    })
    .then(() => {
      assocUserRole(finalUser, finalRole);
      return finalUser;
    })
    .then(user => {
      let resp = {}
      resp.success = true
      resp.message = 'You are now registered'
      resp.accessToken = user.accessToken
      res.send(resp)
    })
  })
}

//todo: create association between user and role.

/*
let createRole = function (desc) {
  Role.create({
    description: desc
  })
  .then(role => {
    return role;
  })
}
*/

let assocUserRole = function (user, role) {
  //role.Role.belongsToMany(User, {through: 'UserRoles'});
  //user.User.belongsToMany(Role, {through: 'UserRoles'});
  //user.associate(role);
  //role.associate(user);
  console.log('assocuserrole user: ' + user + ' role: ' + role);
}

module.exports = {
  registerUser
}
