const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const env = require('dotenv');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

// Database connection
const dbConnection = require('./database/dbConnection');

app.get('/db', async (req, res) => {
  try {
    const result = await dbConnection.query("select * from profile")
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
console.log(__dirname);
app.set('view engine', 'ejs');

app.use(logger('dev')); // Give the incoming response logs
env.config() // Without this line NODE_ENV values wont come from dotenv
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Get the cookie object for the request and can sign a cookie and send the response back
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); //Pass this object to the next middleware, use it only for middleware
});

// http-errors handler
app.use(function(err, req, res, next) {
  // set locals, value exists only the duration of the current request
  // only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //By default the NODE_ENV=development (takes the value from the running process). Here taking NODE_ENV from the dotenv module which refers .env file.
  console.log(process.env.NODE_ENV); 

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error Page' });
});

module.exports = app;
