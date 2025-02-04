const {validationResult} = require('express-validator')

validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let firstError = errors.array()
    return res.status(400).json({ // return in here is very important or else it will move on to the next module
      'status': "error",
      'statusCode': 400,
      'message': firstError[0].msg,
      'data': {}
    })
  }
  next();
};

module.exports = validationErrorHandler