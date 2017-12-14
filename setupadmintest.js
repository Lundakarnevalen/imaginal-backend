const User = require('./models/users').User

User.findOne({
  where: {id: 1}
}).then(admin => {
  'use strict'
  admin.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyZjhyIiwiaWF0IjoxNTEzMTkwMzQ1fQ.ARV7sVxNVqfcn3V2GdTy13o6mx9ZrT2XEPg-EomDY5I'
  admin.save().then(() =>
    process.exit()
  )
})
