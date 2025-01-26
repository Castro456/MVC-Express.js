const app = require('../app');

// http-errors handler
const errorHandler = (err, req, res, next) => {
  // set locals, value exists only the duration of the current request
  // only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //By default the NODE_ENV=development (takes the value from the running process). Here taking NODE_ENV from the dotenv module which refers .env file.
  console.log(process.env.NODE_ENV); 

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error Page' });
};

module.exports = {
  errorHandler
}