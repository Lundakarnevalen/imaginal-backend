const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const register = require('./controllers/register')
const forgotPassword = require('./controllers/forgotpassword')
const passport = require('passport')
require('./config/passport')(passport)
const role = require('./controllers/role')
const section = require('./controllers/section')
const checkin = require('./controllers/checkin')
const users = require('./controllers/users')

require('./config/database')
  .sync()
  .then(() => {
    process.exit()
  })
