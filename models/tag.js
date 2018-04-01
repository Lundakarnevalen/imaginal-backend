const Sequelize = require('sequelize')
const dbc = require('../config/database')

const Tag = dbc.define('Tag', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,

})

const getAllTags = async (req, res) => {
  const isUser = await UserRoles.hasRole(req.user, UserRoles.ADMIN)
  const tagList = await tags.Tag.findAll().map(oneTag => {
    const list = {}
    list['name'] = oneTag.name
    return list
  })
  return res.json({
    success: true,
    message: tagList
  })
}

module.exports = {
  Tag,
  getAllTags
}
