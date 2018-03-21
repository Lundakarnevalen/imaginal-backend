'use strict'

/** Copied from controllers/register */

const items = require('../models/item')

const addItem= function (req, res) {
  const error = []
  if (!req.body.itemName) {
    error.push('itemName')
  }

  if (error.length !== 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameters',
      error
    })
  }

  items.Item.findAll({
    where: {itemName: req.body.itemName}
  }).then((items) => {
    if (items.length > 0) {
      items.forEach((item) => {
        if (item.itemName === req.body.itemName) { error.push('itemName') }
      })

      return res.status(409).json({
        success: false,
        message: 'Item already exists',
        error
      })
    }
    createItem(req, res)
  })
}


const createItem = function (req, res) {
  items.Item.create({
    itemName: req.body.itemName
    }).then(() => {
      res.json({
        sucess: true,
        message: 'Item ' + req.body.itemName + ' added'
        })
      })
  }


/** const createUser = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const token = await jwt.sign({email: req.body.email}, process.env.TOKEN_SECRET || 'secret')
    const user = await items.User.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber || '',
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      address: req.body.address || '',
      postNumber: req.body.postNumber || '',
      city: req.body.city || '',
      careOf: req.body.careOf || '',
      personalNumber: req.body.personalNumber || '',
      shirtSize: req.body.shirtSize || '',
      token
    })

    await user.createKarnevalistInfo({
      language: req.body.language || '',
      driversLicense: req.body.driversLicense || '',
      foodPreference: req.body.foodPreference || '',
      disability: req.body.disability || '',
      audition: req.body.audition || '',
      corps: req.body.corps || '',
      startOfStudies: req.body.startOfStudies || '',
      pastInvolvement: req.body.pastInvolvement || '',
      groupLeader: req.body.groupLeader || false,
      misc: req.body.misc || '',
      plenipotentiary: req.body.plenipotentiary || false,
      bff: req.body.bff || '',
      studentNation: req.body.studentNation || ''
    }, {t})

    const ourRole = await role.Role.findOne({
      where: {Description: 'karnevalist'}
    }, {t})

    await user.addRole([ourRole], {t})

    itemsService.setitemskillsAndTalents(user, req.body.interest, req.body.skills,
      req.body.bigPleasures, req.body.smallPleasures, t)

    await user.setNewPassword(req.body.password)
    await t.commit()

    return res.json({
      success: true,
      message: 'You are now registered with email ' + user.email,
      accessToken: user.token
    })
  } catch (err) {
    await t.rollback()
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Failed to register'
    })
  }
} */

module.exports = {
  addItem
}
