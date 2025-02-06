const {check} = require('express-validator')

loginValidation = [
  check('user_detail')
    .notEmpty().withMessage('Enter your phone number or email address')
    .bail()
    .trim(),

  check('password')
    .notEmpty().withMessage('Enter your password')
    .bail()
    .trim(),
]

module.exports = loginValidation