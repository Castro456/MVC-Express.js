exports.apiSuccessHandler = (response, status, message, data = null) => {
  response.status(status).json({
    'status': "success",
    'statusCode': status,
    'message': message,
    'data': data
  })
}

exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    data: {},
  });
};