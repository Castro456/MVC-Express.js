const express = require('express');
const router = express.Router()
const loginValidation = require('../middlewares/validations/loginValidator')
const validationErrorHandler = require('../middlewares/validations/validationErrorHandler')
const loginController = require('../controllers/loginController')

router.post("/",
    loginValidation,
    validationErrorHandler,
    loginController.authentication
)

module.exports = router