'use strict'

const user = require('./models/users')

user.User.findOne({
  where: {id: 1}
}).then(admin => {
  user.setNewPassword(admin, 'ADMINPASSWORDPLEASEIGNORE').then(() => {
    process.exit()
  })
}).catch(() => {
  console.log('Failed to set adminpassword')
})
