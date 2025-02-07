const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('dotenv');
const helmet = require('helmet');
const xss = require('xss-clean')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Give the incoming response logs
app.use(logger('dev')); 
// Without this line NODE_ENV values wont come from dotenv
env.config() 
app.use(helmet())
app.use(xss()) //Will apply xss clean globally
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Get the cookie object for the request and can sign a cookie and send the response back
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const signupRouter  = require('./routes/signup');
const loginRouter  = require('./routes/login');
const refreshTokenRouter  = require('./routes/refreshToken');

const { pageNotFound } = require('./middlewares/pageNotFound');

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/profile', profileRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/refresh-token', refreshTokenRouter)

/**
 * If entered url not present in the routes then it will call the next middleware with status:404
 */
app.use(function(req, res, next) {
  //createError() use it only for middleware
  next(createError(404, 'Page not found')); 
})

app.use(pageNotFound)

module.exports = app;
