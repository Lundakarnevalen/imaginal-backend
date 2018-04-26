const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const register = require('./register/register')
const forgotPassword = require('./controllers/forgotpassword')
const passport = require('passport')
require('./config/passport')(passport)
const helmet = require('helmet')
const cors = require('cors')
const role = require('./role/roleController')
const section = require('./controllers/section')
const checkin = require('./checkin/checkinController')
const users = require('./users/userController')
const jodel = require('./jodel/controller')

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet())
app.use(cors())

app.use(function (error, req, res, next) {
  if (error.name === 'SyntaxError') {
    res.status(400).json({
      status: false,
      message: 'Bad Request, invalid json'
    })
  }
  next()
})

/**
 * Unauthorized endpoints <----Why is this here?
 */

app.get('/api/medcheck/:personalnumber', users.getSectionByPersonalNumber)
app.post('/register', register.registerUser)
app.post('/login/email', login.loginByEmail)
app.post('/login/forgotpassword', forgotPassword.forgotPassword)
app.post('/login/resetpassword', forgotPassword.setNewPassword)

app.get('/getallsections', section.getAllSections)

/**
 * Authenticate tokens
 */
app.all(/(\/)?api\/.*/, function (req, res, next) {
  passport.authenticate('bearer', { session: false }, function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err)
    }

    if (!user) {
      console.log(err)
      console.log(info)
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return next()
    })
  })(req, res, next)
})

/**
 * Authorized endpoints
 */
app.post('/api/hello', function (req, res) {
  res.json({
    success: true,
    message: 'Hello World!'
  })
})

app.get('/api/user/checkin/:email', checkin.checkStatus)
app.post('/api/user/checkin/:identification', checkin.checkIn)

app.get('/api/user/listcheckins/:email', checkin.listCheckins)

app.put('/api/user/:email', users.setUserInfo)
app.get('/api/user/:identification', users.getById)

app.get('/api/users', users.getAll)

app.post('/api/section', section.setSectionPriorities)
app.get('/api/section', section.getSectionPriorities)

app.post('/api/role/:email/:roleid', role.addRole)
app.delete('/api/role/:email/:roleid', role.removeRole)
app.get('/api/role/:roleid', role.getUsers)

app.post('/api/jodel/newpost', jodel.newPost)
app.post('/api/jodel/newcomment', jodel.addJodelComment)
app.post('/api/jodel/vote', jodel.addJodelVote)
app.post('/api/jodel/addfavourite', jodel.addFavourite)
app.post('/api/jodel/report/post', jodel.reportPost)
app.post('/api/jodel/report/comment', jodel.reportComment)
app.post('/api/jodel/delete/report', jodel.deleteReport)
app.post('/api/jodel/delete/post', jodel.deletePost)
app.post('/api/jodel/delete/comment', jodel.deleteComment)
app.get('/api/jodel/reports/:offset', jodel.getAllReports)
app.get('/api/jodel/:id', jodel.getJodelPost)
app.get('/api/jodel/all/:offset', jodel.getAllPosts)
app.get('/api/jodel/allVotes/:offset', jodel.getAllPostsByVotes)
app.get('/api/jodel/allComments/:offset', jodel.getAllPostsByComments)
app.get('/api/jodel/user/allComments/:offset', jodel.getAllPostsByComments)
app.get('/api/jodel/user/allVotes/:offset', jodel.getAllPostsByVotes)
app.get('/api/jodel/user/allfav/:offset', jodel.getAllUserFavourites)

app.all('*', function (req, res) {
  res.status(404).json({
    success: false,
    message: 'File not found'
  })
})

const port = process.env.PORT || 3000

require('./config/database')
  .sync()
  .then(() => {
    app.listen(port, function () {
      console.log('Listening on port', port)
    })
  })
