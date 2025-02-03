const {validationResult} = require('express-validator')

handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let firstError = errors.array()
    res.status(400).json({
      'status': "error",
      'statusCode': 400,
      'message': firstError[0].msg,
      'data': {}
    })
  }
  next();
};

module.exports = handleValidationErrors