'use strict'

const Mail = require('./mail_model').Mail
const MailSent = require('./mail_sent_model').MailSent
const MailTemplate = require('./mail_template_model').MailTemplate
const UserRoles = require('../models/userrole')

/*  CRUD MailTemplate
 * 
 * 
 */ 

// Get Mailtemplate by ID
const getMailTemplate = async (req, res) => {
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
const getMailTemplate = async (req, res) => {
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
const getMailTemplate = async (req, res) => {
  const isAdmin = await UserRoles.hasRole(req.user, 'administrator')
  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  const mt = req.body
  try{ 
    await MailTemplate.update(
      {
        name: mt.name,
        description: mt.description,
        subject: mt.subject,
        language: mt.language
      }, where: { id: req.params.id}
    )
    res.status(200).json({message: 'Success'})
  } catch(err){
    res.status(400).json({message: 'Bad request'})
  }
}
