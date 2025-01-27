const app = require('../app');

// http-errors handler
// const errorHandler = (status, error, response) => {
//   // set locals, value exists only the duration of the current request
//   // only providing error in development
//   // res.locals.message = err.message;
//   // res.locals.error = req.app.get('env') === 'development' ? err : {};

//   response.status(status).json({
//     'status': status,
//     'message': error.message
//   })
// };

const errorHandler = (err, req, res, next) => {
  // Fallback status and message if they are undefined
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Respond in JSON format
  res.status(status).json({
    status,
    message,
    // Include the stack trace in development mode only
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorHandler
}