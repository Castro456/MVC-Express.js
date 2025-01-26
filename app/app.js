const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('dotenv');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Give the incoming response logs
app.use(logger('dev')); 
// Without this line NODE_ENV values wont come from dotenv
env.config() 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Get the cookie object for the request and can sign a cookie and send the response back
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const { errorHandler } = require('./middlewares/errorHandler');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter)

/**
 * If entered user not present in the routes then it will call the next middleware with status:404
 */
app.use(function(req, res, next) {
  //createError() use it only for middleware
  next(createError(404)); 
})

app.use(errorHandler)

module.exports = app;
