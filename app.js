var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const env = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
console.log(__dirname);
app.set('view engine', 'ejs');

app.use(logger('dev')); // Give the incoming response logs
env.config() // Without this line NODE_ENV values wont come from dotenv
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //Get the cookie object for the request and can sign a cookie and send the response back
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); //Pass this object to the next middleware
});

// http-errors handler
app.use(function(err, req, res, next) {
  // set locals, uses local storage
  // only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(process.env.NODE_ENV); //by default the NODE_ENV=development. Here taking NODE_ENV from the dotenv module which refers .env file.

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error Page' });
});

module.exports = app;
