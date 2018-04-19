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

// S3 bucket names
const bucket = 'karnevalistbilder'
const cropped_bucket = 'karnevalistbilder-cropped'
const thumb_bucket = 'karnevalistbilder-thumbnails'
const cropped_thumb_bucket = 'karnevalistbilder-cropped-thumbnails'

// Define storage for full-sized images
const uploadFull = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        key: rename_image 
    })
});

// Define storage for cropped images
const uploadCropped = multer({
    storage: multerS3({
        s3: s3,
        bucket: cropped_bucket,
        key: rename_image 
    })
});
function rename_image(req, file, cb) {
  const newName = (new Date()).toISOString().split('T')[0] + "_" + file.originalname 
  cb(null, newName); 
}

// Function for uploading original full image
const uploadFullPhoto = uploadFull.single('file')

// Function for uploading original full image
const uploadCroppedPhoto = uploadCropped.single('file')

// Function for uploading thumbnail of full image
const uploadFullDone =  async (req, res, next) => {
  const userId = req.body.userId
  const fileName = req.file.key
  const outbucket = thumb_bucket 

  uploadThumbnail(res, bucket, fileName, outbucket, userId)
}


// Function for uploading thumbnail of full image
const uploadCroppedDone = async (req, res, next) => {
  const fileName = req.file.key
  const outbucket = cropped_thumb_bucket 

  uploadThumbnail(res, cropped_bucket, fileName, outbucket, false)
}

// Fetch image from inbucket, resize it to max-height350px, then upload to
// outbucket.
function uploadThumbnail(res, inbucket, fileName, outbucket, userId){
  // Fetch image from inbucket
  s3.getObject({
    Bucket: inbucket, 
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
        // Resize image to max 350px in height
        shrunk.resize(Jimp.AUTO, 350) 
             .quality(100)           
             .getBuffer(Jimp.MIME_JPEG, function(err, buff){
          if (err) 
            return res.status(500).json(err) 
          console.log(`uploading ${fileName} to`, thumb_bucket)

          // Upload resized image to outbucket
          s3.upload({
            Key: fileName,
            Body: buff,
            Bucket: outbucket
          }, async function(err, data) {
            if (err) 
              return res.status(500).json(err) 

            // If userId, then update imagename in database
            if(userId){
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
            
                console.log('Upload success!')
                res.send("Uploaded!");
              } catch(err){
                console.log('Full error!')
                res.status(500).json(err)
              }
            } else {
              console.log('Upload success!')
              res.send("Uploaded!");
            }
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

// Return thumbnail of image
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
// Return the thumbnail-cropped image of a karnevalist. 
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
  try{
    const img = await UserImage.update({
      bad_picture: true
    },{where: {image_name: req.params.imagename}})
    res.status(200).json({message: 'Went ok'})
  } catch(error){
    res.status(500).json(error) 
  }
}

// Update image to good
const updateGoodPhoto = async (req, res) => {
  try{
    const img = await UserImage.update({
      bad_picture: false
    },{where: {image_name: req.params.imagename}})
    res.status(200).json({message: 'Went ok'})
  } catch(error){
    res.status(500).json(error) 
  }
}

// Update image comment
const updateImageComment = async (req, res) => {
  try{
    await UserImage.update({
      comments: req.body.comment
    },{where: {image_name: req.body.image_name}})
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
