'use strict'

const UserImage = require('../models/userimage').UserImage
const fs = require('fs');
const AWS = require('aws-sdk');

// Setup AWS 
AWS.config.region = 'eu-central-1';
const s3 = new AWS.S3();
const multer = require('multer')
const multerS3 = require('multer-s3')

// S3 bucket names
const bucket = 'karnevalistbilder'
const cropped_bucket = 'karnevalistbilder-cropped'
const thumb_bucket = 'karnevalistbilder-thumbnails'
const cropped_thumb_bucket = 'karnevalistbilder-cropped-thumbnails'

const uploadFull = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        key: function (req, file, cb) {
            // Random string if multiple are uploaded same day
            const newName = (new Date()).toISOString().split('T')[0] + "_" + Math.floor(Math.random() * Math.floor(30)) + "_" + file.originalname 
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
        bucket: cropped_bucket,
        key: function (req, file, cb) {
            // Random string if multiple are uploaded same day
            const newName = (new Date()).toISOString().split('T')[0] + "_" + Math.floor(Math.random() * Math.floor(30)) + "_" + file.originalname 
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

  try{
    const img = await UserImage.update({
      bad_picture: true
    },{where: {image_name: filename}})
    res.status(200).json({message: 'Went ok'})
  } catch(error){
    res.status(500).json(error) 
  }
}

// Update image to good
const updateGoodPhoto = async (req, res) => {
  const filename = req.params.imagename;

  try{
    const img = await UserImage.update({
      bad_picture: false
    },{where: {image_name: filename}})
    res.status(200).json({message: 'Went ok'})
  } catch(error){
    res.status(500).json(error) 
  }
}

// Update image comment
const updateImageComment = async (req, res) => {
  const filename = req.body.image_name;
  const comment = req.body.comment;

  try{
    await UserImage.update({
      comments: comment
    },{where: {image_name: filename}})
    res.status(200).json({message: 'Went ok'})
  } catch(error){
    res.status(500).json(error) 
  }
}

module.exports = {
  getimage,
  getfullimage,
  getcroppedimage,
  updateBadPhoto,
  updateGoodPhoto,
  uploadFullPhoto,
  uploadFullDone,
  uploadCroppedPhoto,
  uploadCroppedDone,
  updateImageComment,
}
