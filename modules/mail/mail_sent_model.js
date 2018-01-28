const Sequelize = require('sequelize')
const dbc = require('../../config/database')
const Mail = require('../../modules/mail/mail_model').Mail
const MailTemplate = require('../../modules/mail/mail_template_model').MailTemplate

const MailSent = dbc.define('MailSent', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  mailstatus: {
    type: Sequelize.ENUM('delivered', 'sent')
  }
})

Mail.hasMany(MailSent, { as: 'MailSentStatus', foreignKey: 'mailStatusSent' })
MailTemplate.hasMany(MailSent, { as: 'MailTemplateStatus', foreignKey: 'mailTemplateSent' })

module.exports = {
  MailSent
}
