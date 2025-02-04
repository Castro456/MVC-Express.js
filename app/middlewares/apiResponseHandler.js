exports.successHandler = (res, statusCode, message, data = false) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data
  })
}

exports.errorHandler = (res, statusCode, message, data = false) => {
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    data
  });
};