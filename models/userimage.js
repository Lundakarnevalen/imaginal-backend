'use strict'
const Sequelize = require('sequelize')
const dbc = require('../config/database')
const User = require('../users/users').User

const UserImage = dbc.define('UserImage', {
  user_id: {
    type: Sequelize.INTEGER,
  },
  image_name: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  comments: {
    type: Sequelize.STRING
  },
  bad_picture: {
    type: Sequelize.BOOLEAN
  },
  has_crop: {
    type: Sequelize.BOOLEAN
  },
  good_crop: {
    type: Sequelize.BOOLEAN
  },
  proxy: {
    type: Sequelize.BOOLEAN
  },
  current_image: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = {
  UserImage,
}
