const {check} = require('express-validator')

signupValidation = [
  check('first_name')
    .notEmpty().withMessage('First name is required')
    .bail()
    .trim()
    .isAlpha().withMessage('First name must contain only characters'),

  check('last_name')
    .notEmpty().withMessage('Last name is required')
    .bail()
    .trim()
    .isAlpha().withMessage('First name must contain only characters'),
  
  check('email')
    .notEmpty().withMessage('Email is required')
    .bail()
    .trim()
    .isEmail().withMessage('Enter valid email address'),
  
  check('phone')
    .notEmpty().withMessage('Phone number is required')
    .bail()
    .trim()
    .isNumeric().withMessage('Phone number must contain only numbers'),
  
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .trim()
    .isLength({min: 6}).withMessage('Password minimum of 6 length required')
    .bail()
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
]

module.exports = signupValidation