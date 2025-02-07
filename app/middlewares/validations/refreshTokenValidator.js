const {check} = require('express-validator')

refreshTokenValidation = [
  check('refresh_token')
    .notEmpty().withMessage('Refresh token is required')
    .bail()
    .trim()
]

module.exports = refreshTokenValidation