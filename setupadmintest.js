'use strict'

const user = require('./users/users')

user.User.findOne({
  where: {id: 1}
}).then(async(admin) => {
  await admin.setNewPassword('Hejsan12').then(() => {
    process.exit()
  })
}).catch(() => {
  console.error('Failed to set adminpassword')
})
