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
  exported: {
    type: Sequelize.BOOLEAN
  },
  current_image: {
    type: Sequelize.BOOLEAN
  }
})

const cardInformation = function(){
  return dbc.query(`
select 
	u.id, s.nameSv, u.firstName, u.lastName, u.personalNumber,
	ui.image_name, ui.bad_picture, ui.exported 
from 
	Users u 
	join UserSections us on u.id=us.userId 
	join Sections s on s.id=us.sectionId 
	join UserImages ui on ui.user_id=u.id
where
  ui.current_image=1
  and ui.bad_picture!=1
  `, {type: Sequelize.QueryTypes.SELECT})
}

module.exports = {
  UserImage,
  cardInformation
}
