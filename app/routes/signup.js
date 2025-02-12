const express = require('express');
const router = express.Router()
const signupController = require('../controllers/signupController');
const signupValidation = require('../middlewares/validations/signupValidator')
const validationErrorHandler = require('../middlewares/validations/validationErrorHandler')

router.post("/",
  // ...[signupValidation],
  signupValidation,
  validationErrorHandler,
  signupController.register
)

module.exports = router