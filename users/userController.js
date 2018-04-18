'use strict'

const users = require('./users')
const UserRoles = require('../models/userrole')
const UserImage = require('../models/userimage').UserImage
const UserSection = require('../models/userSection')
const userService = require('./usersService')
const fs = require('fs');


const getAll = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }

  const offset = parseInt(req.query.offset) || 0
  const limit = 25
  if (offset < 0) {
    return res.status(500).json({
      success: false,
      message: 'Invalid offset'
    })
  }
  const allUsers = await users.getAllUsersAndCount(offset, limit)
  const allUserJSON = await Promise.all(allUsers.rows.map(async (user) => { return user.toJSON() }))

  res.json({
    success: true,
    users: allUserJSON,
    count: allUsers.count
  })
}

/** From a social security number - fetch all sections for the user. */
const getSectionByPersonalNumber = async (req, res) => {

  // ssn - Social Security Number
  const ssn = req.params.personalnumber 

  if (!ssn) { // If no ssn is given, return bad request.
    return res.status(400).json({
      success: false,
      message: 'Missing personalNumber parameter'
    })
  }

  // To catch errors when using async-await.
  try {
    // Fetch user from db using the ssn.
    const user = await users.getUserByIdentification(ssn)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Not a karnevalist'
      })
    }

    // Fetch sections of user from db.
    const sections = await UserSection.findSectionsOfUser(user)
    return res.json({
      success: true,
      sections,
    })
  } catch (err) {
    // On error, log and return success false.
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to get sections of user.'
    })
  }
}

// S3 bucket names
const bucket = 'karnevalistbilder'
const thumb_bucket = 'karnevalistbilder-thumbnails'
const cropped_thumb_bucket = 'karnevalistbilder-cropped-thumbnails'

// Setup AWS 
var AWS = require('aws-sdk');
AWS.config.region = 'eu-central-1';
const s3 = new AWS.S3({params: {Bucket: thumb_bucket }});
const multer = require('multer')
const multerS3 = require('multer-s3')



const uploadFull = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'karnevalistbilder',
        key: function (req, file, cb) {
            console.log(file);
            const newName = (new Date()).toISOString().split('T')[0] + "_" + file.originalname
            cb(null, newName); 
        }
    })
});
const uploadFullPhoto = uploadFull.single('file')
const uploadFullDone =  async (req, res, next) => {
  const userId = req.body.userId
  const fileName = req.file.key
    
  try {
    await UserImage.update({
      current_image: false
    },{where: {user_id: userId}})

    await UserImage.create({
      user_id: userId,
      image_name: fileName,
      bad_picture: false,
      current_image: true,
    })

    console.log('Full success!')
    res.send("Uploaded!");
  } catch(err){
    console.log('Full error!')
    res.status(500).json(err)
  }
}
const uploadCropped = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'karnevalistbilder-cropped',
        key: function (req, file, cb) {
            console.log(file);
            const newName = (new Date()).toISOString().split('T')[0] + "_" + file.originalname
            cb(null, newName); 
        }
    })
});
const uploadCroppedPhoto = uploadCropped.single('file')
const uploadCroppedDone = async (req, res, next) => {
  res.send("Uploaded!");
}


// Return the image of a karnevalist. 
// If localhost then get local file, otherwise s3
const getfullimage = async (req, res) => {
  const filename = req.params.imagename;

  const filepath = '/Users/christophernilsson/Desktop/karnevalister/all_files/' + filename
  if(fs.existsSync(filepath)){
    res.sendFile(filepath)
    return 
  }
  const url = s3.getSignedUrl('getObject', { Bucket: bucket, Key: filename });
  res.redirect(url)
}
const getimage = async (req, res) => {
  const filename = req.params.imagename;

  const filepath = '/Users/christophernilsson/Desktop/karnevalister/thumbnails/' + filename
  if(fs.existsSync(filepath)){
    res.sendFile(filepath)
    return 
  }
  const url = s3.getSignedUrl('getObject', { Bucket: thumb_bucket, Key: filename });
  res.redirect(url)
}
// Return the cropped image of a karnevalist. 
// If localhost then get local file, otherwise s3
const getcroppedimage = async (req, res) => {
  const filename = req.params.imagename;

  const filepath = '/Users/christophernilsson/Desktop/karnevalister/thumbnails_cropped/' + filename
  if(fs.existsSync(filepath)){
    res.sendFile(filepath)
    return
  }
  const url = s3.getSignedUrl('getObject', { Bucket: cropped_thumb_bucket, Key: filename });
  res.redirect(url)
}
// Update bad image
const updateBadPhoto = async (req, res) => {
  const filename = req.params.imagename;

  const img = await UserImage.update({
    bad_picture: true
  },{where: {image_name: filename}})
  res.status(200).json({message: 'Went ok'})
}

// Update image to good
const updateGoodPhoto = async (req, res) => {
  const filename = req.params.imagename;

  const img = await UserImage.update({
    bad_picture: false
  },{where: {image_name: filename}})
  res.status(200).json({message: 'Went ok'})
}


const getById = async (req, res) => {
  const identification = req.params.identification
  try {
    if (!identification) {
      return res.status(400).json({
        success: false,
        message: 'Missing identification parameter'
      })
    }

    const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)
    if (!(isAdmin ||
        (identification === req.user.email || identification === req.user.personalNumber))) {
      return res.status(401).json({
        success: false,
        message: 'Admin privileges required'
      })
    }
    const user = await users.getUserByIdentification(identification)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No such user'
      })
    }

    const userinfo = await user.toJSON()
    return res.json({
      success: true,
      userinfo,
      user: userinfo // compability with app
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    })
  }
}

const setUserInfo = async (req, res) => {
  try {
    const email = req.params.email
    const isAdmin = await UserRoles.hasRole(req.user, UserRoles.ADMIN)

    if (!isAdmin && email !== req.user.email) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied'
      })
    }

    const user = await users.getUserByIdentification(email)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No such user'
      })
    }

    await userService.setAndUpdateUserInformation(user, req.body)
    await userService.setUserSkillsAndTalents(user, req.body.interest, req.body.skills,
      req.body.bigPleasures, req.body.smallPleasures)

    return res.json({
      success: true,
      message: 'User info updated'
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to update user info'
    })
  }
}

const getUsersFromSection = async (req, res) => {

  const sectionid = req.params.sectionid 

  // To catch errors when using async-await.
  try {
    const userList = await users.getUsersBySection(sectionid)
    if (!userList) {
      return res.status(400).json({
        success: false,
        message: 'Not found'
      })
    }

    // Fetch sections of user from db.
    return res.json({
      success: true,
      users: userList,
    })
  } catch (err) {
    // On error, log and return success false.
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to get sections of user.'
    })
  }
}

module.exports = {
  getAll,
  getById,
  setUserInfo,
  getSectionByPersonalNumber,
  getimage,
  getfullimage,
  getcroppedimage,
  updateBadPhoto,
  updateGoodPhoto,
  uploadFullPhoto,
  uploadFullDone,
  uploadCroppedPhoto,
  uploadCroppedDone,
  getUsersFromSection
}
