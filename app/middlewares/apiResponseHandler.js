exports.apiSuccessHandler = (response, status, message, data = null) => {
  response.status(status).json({
    'status': status,
    'message': message,
    'data': data
  })
}

exports.apiErrorHandler = (response, status, message, error = null) => {
  console.log(error);
  response.status(status).json({
    'status': status,
    'message': message,
    'error': error.message
  })
}