'use strict'

const userimage = require('../models/userimage')
const UserImage = userimage.UserImage
const UserCardExport = require('../models/usercardexport').UserCardExport
const cardInformation = userimage.cardInformation
const Section = require('../models/section').Section
const fs = require('fs')
const AWS = require('aws-sdk')
const Jimp = require('jimp')
const pdf = require('html-pdf')

// Setup AWS
AWS.config.region = 'eu-central-1'
const s3 = new AWS.S3()
const multer = require('multer')
const multerS3 = require('multer-s3')

// S3 bucket names
const bucket = 'karnevalistbilder'
const croppedBucket = 'karnevalistbilder-cropped'
const thumbBucket = 'karnevalistbilder-thumbnails'
const croppedThumbBucket = 'karnevalistbilder-cropped-thumbnails'

// Define storage for full-sized images
const uploadFull = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: renameImage
  })
})

// Define storage for cropped images
const uploadCropped = multer({
  storage: multerS3({
    s3: s3,
    bucket: croppedBucket,
    key: renameImage
  })
})

function renameImage (req, file, cb) {
  const newName = (new Date()).toISOString().split('T')[0] + '_' + file.originalname
  cb(null, newName)
}

// Function for uploading original full image
const uploadFullPhoto = uploadFull.single('file')

// Function for uploading original full image
const uploadCroppedPhoto = uploadCropped.single('file')

// Function for uploading thumbnail of full image
const uploadFullDone = async (req, res, next) => {
  const userId = req.body.userId
  const fileName = req.file.key

  uploadThumbnail(res, bucket, fileName, thumbBucket, userId)
}

// Function for uploading thumbnail of full image
const uploadCroppedDone = async (req, res, next) => {
  const fileName = req.file.key

  uploadThumbnail(res, croppedBucket, fileName, croppedThumbBucket, false)
}

// Fetch image from inbucket, resize it to max-height350px, then upload to
// outbucket.
function uploadThumbnail (res, inbucket, fileName, outbucket, userId) {
  // Fetch image from inbucket
  s3.getObject({
    Bucket: inbucket,
    Key: fileName
  }, function (err, data) {
    // Handle any error and exit
    if (err) { return res.status(500).json(err) }

    console.log('Reading body...')
    Jimp.read(data.Body, function (err, shrunk) {
      if (err) { return res.status(500).json(err) }

      console.log('resizing...')
      // Resize image to max 350px in height
      shrunk.resize(Jimp.AUTO, 350)
             .quality(100)
             .getBuffer(Jimp.MIME_JPEG, function (err, buff) {
               if (err) { return res.status(500).json(err) }
               console.log(`uploading ${fileName} to`, thumbBucket)

          // Upload resized image to outbucket
               s3.upload({
                 Key: fileName,
                 Body: buff,
                 Bucket: outbucket
               }, async function (err, data) {
                 if (err) { return res.status(500).json(err) }

            // If userId, then update imagename in database
                 if (userId) {
                   try {
                     await UserImage.update({
                       current_image: false
                     }, {where: {user_id: userId}})

                     await UserImage.create({
                       user_id: userId,
                       image_name: fileName,
                       bad_picture: false,
                       current_image: true
                     })

                     console.log('Upload success!')
                     res.send('Uploaded!')
                   } catch (err) {
                     console.log('Full error:', err)
                     res.status(500).json(err)
                   }
                 } else {
                   console.log('Upload success!')
                   res.send('Uploaded!')
                 }
               })
             })
    })
  })
}

// Return the image of a karnevalist.
// If localhost then get local file, otherwise s3
const getfullimage = async (req, res) => {
  const filename = req.params.imagename
  const path = getImageURL(bucket, 'all_files', filename)
  if (path.indexOf('/Users') > -1) {
    return res.sendFile(path)
  }
  res.redirect(path)
}

// Return thumbnail of image
const getimage = async (req, res) => {
  const filename = req.params.imagename
  const path = getImageURL(thumbBucket, 'thumbnails', filename)
  if (path.indexOf('/Users') > -1) {
    return res.sendFile(path)
  }
  res.redirect(path)
}
// Return the thumbnail-cropped image of a karnevalist.
// If localhost then get local file, otherwise s3
const getcroppedimage = async (req, res) => {
  const filename = req.params.imagename
  const path = getImageURL(croppedThumbBucket, 'thumbnails_cropped', filename)
  if (path.indexOf('/Users') > -1) {
    return res.sendFile(path)
  }
  res.redirect(path)
}
function getImageURL (bucket, folder, filename) {
  const filepath = '/Users/christophernilsson/Desktop/karnevalister/' + folder + '/' + filename
  if (fs.existsSync(filepath)) {
    return filepath
  }
  return s3.getSignedUrl('getObject', { Bucket: bucket, Key: filename })
}

// Update bad image
const updateBadPhoto = async (req, res) => {
  try {
    await UserImage.update({
      bad_picture: true
    }, {where: {image_name: req.params.imagename}})
    res.status(200).json({message: 'Went ok'})
  } catch (error) {
    res.status(500).json(error)
  }
}

// Update image to good
const updateGoodPhoto = async (req, res) => {
  try {
    await UserImage.update({
      bad_picture: false
    }, {where: {image_name: req.params.imagename}})
    res.status(200).json({message: 'Went ok'})
  } catch (error) {
    res.status(500).json(error)
  }
}

// Update image comment
const updateImageComment = async (req, res) => {
  try {
    await UserImage.update({
      comments: req.body.comment
    }, {where: {image_name: req.body.image_name}})
    res.status(200).json({message: 'Went ok'})
  } catch (error) {
    res.status(500).json(error)
  }
}

const createCard = async (req, res) => {
  const filename = req.params.imagename

  // Work directory with pdfs
  const dir = getCardDir()

  // Get diff, those that are left to export
  const images = await cardInformation({})

  // Get diff, those that are left to export
  const toExport = images.filter(i => i.image_name === filename)

  // Export pdf
  exportPdf(toExport, dir)

  res.json({message: 'Its ok'})
}
function exportPdf (toExport) {
  const curr = toExport[0]
  const name = `${curr.firstName} ${curr.lastName}`
  const section = curr.nameSv
  const pNumber = curr.personalNumber
  const ssn = pNumber.slice(0, 6) + '-' + pNumber.slice(6)
  const filename = curr.image_name

  const imagePath = s3.getSignedUrl('getObject', { Bucket: croppedThumbBucket, Key: filename })
  // let imagePath = getImageURL(croppedThumbBucket, 'thumbnails_cropped', filename)

  const html = fs.readFileSync('./templates/card.html', 'utf8')
    .replace('URL_TO_USE', imagePath)
    .replace('NAME', name)
    .replace('NM_SIZE', name.length > 25 ? '20px' : '26px')
    .replace('SECTION', section)
    .replace('SSN', ssn)

  pdf.create(html, {
    height: '540px',
    width: '860px',
    renderDelay: 2000
  }).toFile('./cardpdfs/' + filename + '.pdf', (err, res) => {
    if (err) { console.log('error:', err) }
    console.log('Done!!!!')
  })
}
function exportHtml (toExport, template) {
  if (toExport.length === 0) {
    return ''
  }
  const curr = toExport[0]
  const name = `${curr.firstName} ${curr.lastName}`
  const section = curr.nameSv
  const pNumber = curr.personalNumber
  const ssn = pNumber.slice(0, 6) + '-' + pNumber.slice(6)
  const filename = curr.image_name
  const imagePath = s3.getSignedUrl('getObject', { Bucket: croppedThumbBucket, Key: filename })
  // let imagePath = getImageURL(croppedThumbBucket, 'thumbnails_cropped', filename)

  let templateCopy = (' ' + template).slice(1)
  const html = templateCopy.replace('URL_TO_USE', imagePath)
    .replace('NAME', name)
    .replace('NM_SIZE', name.length > 25 ? '20px' : '26px')
    .replace('SECTION', section)
    .replace('SSN', ssn)
  return html + exportHtml(toExport.slice(1), template)
}

const createSectionPdfs = async (req, res) => {
  const section = {nameSv: req.params.sectionname}
  generateSectionPdf(section, (err, result) => {
    if (err) { return res.status(500).json(err) }
    res.json({message: result})
  })
}
const createAllSectionPdfs = async (req, res) => {
  const sections = await Section.findAll()
  function sectionIterator (sections) {
    console.log(`Generating pdf for ${sections[0].nameSv}...`)
    generateSectionPdf(sections[0], (err, result) => {
      if (err) {
        res.status(500).json(err)
      } else if (sections.length <= 1) {
        res.json({message: result})
      } else {
        sectionIterator(sections.slice(1))
      }
    })
  }
  sectionIterator(sections)
}

// Input: Sectionname and a callback-function
async function generateSectionPdf (section, cb) {
  // Get all userimages
  console.log('get images...')
  const images = await cardInformation({})

  // Get diff, those that are left to export
  console.log(`Filtering on ${section.nameSv}`)
  const toExport = images.filter(i => i.nameSv === section.nameSv)
  console.log(`Exporting: ${toExport.length} karnevalists`)
  if (toExport.length < 1) {
    console.log('No karnevalist left to export... aborting')
    return cb('No karnevalists left in section to export', null)
  }

  // Set images as exported in database
  const user_ids = toExport.map(i => {
    return { user_id: i.id }
  })
  const create_res = await UserCardExport.bulkCreate(user_ids)

  // Divide inte chunks of 100
  const chunkSize = 100
  let chunked = toExport.reduce((acc, curr) => {
    if (acc[0].length < chunkSize) {
      acc[0].push(curr)
    } else {
      acc.unshift([curr])
    }
    return acc
  }, [[]])

  let count = 0
  function chunkIterator (err, res) {
    const callback = chunked.length <= 1 ? cb : chunkIterator
    const chunk = chunked.pop()

    // Load template
    const template = fs.readFileSync('./templates/card.html', 'utf8')

    // Create html of all cards
    console.log(`Generating html...`)
    const html = exportHtml(chunk, template)

    // Get current date
    const currDate = (new Date()).toISOString().split('T')[0]

    // Create pdf
    console.log(`Generating pdf...`)
    pdf.create(html, {
      height: '540px',
      width: '860px',
      renderDelay: 500
    }).toFile(getCardDir() + '/' + currDate + '_' + section.nameSv + '_' + ++count + '.pdf', callback)
  }
  chunkIterator()
}

// Returns the directory of the cards, and ensures it exists
function getCardDir () {
  const dir = './cardpdfs'
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir) }
  return dir
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
  createCard,
  createSectionPdfs,
  createAllSectionPdfs
}
