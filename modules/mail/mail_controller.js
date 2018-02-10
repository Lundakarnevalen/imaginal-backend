'use strict'

const Mail = require('./mail_model').Mail
const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const MailSent = require('./mail_sent_model').MailSent
const MailTemplate = require('./mail_template_model').MailTemplate
//const UserRoles = require('../models/userrole')
const AWS = require('aws-sdk')

/*
 *  Local solution
 */


const awsConfig = { 
  "accessKeyId": process.env.AWS_ACCESS_ID,
  "secretAccessKey": process.env.AWS_ACCESS_KEY,
  "region": "eu-west-1"
}

AWS.config.update(awsConfig)
const sender = 'auto-mail@lundakarnevalen.se'
//const sender = 'gustaf.linton@lundakarnevalen.se'

// Reading list of emails in txtfile
const emails = fs.readFileSync('./modules/mail/data/aud3.data', 'utf-8').split('\n')

// Reading json from sequel
//let emails = require('./data/1_ej_sektion.json').data.map(d => d.email.trim())

// Hardcoded emails for testing
//let emails = ['christopher.nille.nilsson@gmail.com', 'gustaf.linton@lundakarnevalen.se']

//console.log(emails)

// Send 20 emails every 2 second
setInterval(fun2, 2000)

// Send to next 20 email-adresses
let i = 0
function fun2(){
  for(var j = 0; j < 20; j++){
    if(i+j >= emails.length){
      console.log('DONEDONEDONEDONE')
      i += 20;
      return;
    }
    console.log(i+j, emails[i+j])

    // Uncomment when ready to send email
    //try_mail(emails[i+j])
  }
  i += 20
}

async function try_mail(email){i
  await sendEmail(email, 'Karnevalsauditions! Schemaläggning färdig', 'auditions3', {})
}

const sendEmail = (email, subject, template_name, data) => {
  return new Promise((resolve, reject) => {
    const template = fs.readFileSync(
      path.resolve(__dirname, './templates/' + template_name + '.mustache')
    )
    const msg = mustache.render(template.toString(), {resetPasswordHash: data})
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: msg
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject 
        }
      },
      Source: sender
    }

    const ses = new AWS.SES({apiVersion: '2010-12-01'})
    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log('Invalid:', email, err)
        reject(err)
      } else {
        console.log('Valid:', email, data)
        resolve()
      }
    })
  })
}


/*  CRUD MailTemplate
 * 
 * 
 */ 

// Get Mailtemplate by ID
const getMailTemplateById = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  try{ 
    const mt = await MailTemplate.findById(req.params.id)
    res.status(200).json(mt)
  } catch(err){
    res.status(404).json({message: 'Mailtemplate not found'})
  }
}

// Get list of MailTemplate 
const getMailTemplateList = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  try{ 
    const mts = await MailTemplate.findAll({})
    res.status(200).json(mts)
  } catch(err){
    res.status(404).json({message: 'Mailtemplate not found'})
  }
}

// Update Mailtemplate by ID
const updateMailTemplate = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  const mt = req.body
  try{ 
    await MailTemplate.update({
        name: mt.name,
        description: mt.description,
        subject: mt.subject,
        language: mt.language
      }, { where: { id: req.params.id } })
    res.status(200).json({message: 'Success'})
  } catch(err){
    res.status(400).json({message: 'Bad request'})
  }
}
