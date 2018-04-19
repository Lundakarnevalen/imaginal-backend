'use strict'

const UserImage = require('../models/userimage').UserImage
const fs = require('fs');
const AWS = require('aws-sdk');
const Jimp = require("jimp");

// Setup AWS 
AWS.config.region = 'eu-central-1';
const s3 = new AWS.S3();
const multer = require('multer')
const multerS3 = require('multer-s3')
const gcsSharp = require('multer-sharp');

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
          const newName = (new Date()).toISOString().split('T')[0] + "_" + file.originalname 
          cb(null, newName); 
        }
    })
});
const uploadFullCropped = gcsSharp({
  filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-newFilename`);
  },
  bucket: 'YOUR_BUCKET', // Required : bucket name to upload
  projectId: 'YOUR_PROJECTID', // Required : Google project ID
  keyFilename: 'YOUR_KEYFILENAME', // Required : JSON credentials file for Google Cloud Storage
  acl: 'publicRead', // Required : acl credentials file for Google Cloud Storage, 'publicrRead' or 'private', default: 'private'
  size: {
    width: 400,
    height: 400
  },
  max: true
});
const uploadFullPhoto = uploadFull.single('file')
const uploadFullDone =  async (req, res, next) => {
  const userId = req.body.userId
  const fileName = req.file.key

  const outbucket = thumb_bucket 
  console.log(outbucket, fileName)

  s3.getObject({
    Bucket: bucket, 
    Key: fileName 
  }, function(err, data) {
    // Handle any error and exit
    if (err)
      return res.status(500).json(err) 

    console.log('Reading body...')
    Jimp.read(data.Body, function (err, shrunk) {
        if (err) 
          return res.status(500).json(err) 
        
        console.log('resizing...')
        shrunk.resize(Jimp.AUTO, 350) 
             .quality(100)           

        console.log('get buffer...')
        shrunk.getBuffer(Jimp.MIME_JPEG, function(err, buff){
          console.log('Received buffer')
          if (err) 
            return res.status(500).json(err) 
          console.log(`uploading ${fileName} to`, thumb_bucket)
          s3.upload({
            Key: fileName,
            Body: buff,
            Bucket: outbucket
          }, async function(err, data) {
            if (err) 
              return res.status(500).json(err) 
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
          });     
        })
    });
  });
}
const uploadCropped = multer({
    storage: multerS3({
        s3: s3,
        bucket: cropped_bucket,
        key: function (req, file, cb) {
          const newName = (new Date()).toISOString().split('T')[0] + "_" + file.originalname 
          cb(null, newName); 
        }
    })
});
const uploadCroppedPhoto = uploadCropped.single('file')
const uploadCroppedDone = async (req, res, next) => {
  const userId = req.body.userId
  const fileName = req.file.key
  const outbucket = cropped_thumb_bucket 
  console.log(outbucket, fileName)

  s3.getObject({
    Bucket: cropped_bucket, 
    Key: fileName 
  }, function(err, data) {
    // Handle any error and exit
    if (err){
      console.log(err)
      return res.status(500).json(err) 
    }
    console.log('Reading body...')
    Jimp.read(data.Body, function (err, shrunk) {
        if (err){
          console.log(err)
          return res.status(500).json(err) 
        }
        
        console.log('resizing...')
        shrunk.resize(Jimp.AUTO, 350) 
             .quality(100)           

        console.log('get buffer...')
        shrunk.getBuffer(Jimp.MIME_JPEG, function(err, buff){
          console.log('Received buffer')
          if (err){
            console.log(err)
            return res.status(500).json(err) 
          }
          console.log(`uploading ${fileName} to`, thumb_bucket)
          s3.upload({
            Key: fileName,
            Body: buff,
            Bucket: outbucket
          }, function(err, data) {
            if (err){
              console.log(err)
              return res.status(500).json(err) 
            }
            res.send("Uploaded!");
          });     
        })
    });
  });
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
