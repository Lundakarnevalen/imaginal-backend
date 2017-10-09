const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')

app.use(bodyParser.json())


/******LOGIN********/
app.post('/login/email', login.login)


/*******************/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
