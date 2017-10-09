const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login = require('./controllers/login')
const User = require('./models/users').User

app.use(bodyParser.json())


/*****TESTING PASSPORT****/

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
	  console.log('sdgsdf')
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
		  console.log('adsasd')
		  return done(err); }
      if (!user) {
		  console.log('didnt find user')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
		  console.log('asdasd')
        return done(null, false, { message: 'Incorrect password.' });
      }
		else {
			console.log('asdads')
		}
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/' }));


/******LOGIN********/
app.post('/login/email', login.login)

app.post('/asd', login.findUser)
/*******************/
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
