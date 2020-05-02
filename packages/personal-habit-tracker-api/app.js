if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');

const cookieKey = process.env.COOKIE_KEY;
const dbConnectionString = process.env.MONGO_URI;
mongoose.connect(dbConnectionString, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const users = require('./routes/users');
const habit = require('./routes/habit');
const auth = require('./routes/auth');
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client')));
app.use(cors())
// Passport stuff...
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [cookieKey]  
}))
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/habits', passport.authenticate('jwt', {session: false}), habit);
app.use('/api/occurrence_habits', passport.authenticate('jwt', {session: false}), habit);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/'));
});

module.exports = app;
