const express = require('express');
const router = express.Router()
const signupController = require('../controllers/signupController');
const signupValidation = require('../middlewares/signupValidator')
const validationHandler = require('../middlewares/validationErrorHandler')

router.get("/",
  // ...[signupValidation],
  signupValidation,
  validationHandler,
  signupController.register
)

module.exports = router