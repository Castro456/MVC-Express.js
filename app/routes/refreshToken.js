const express = require('express');
const router = express.Router();

const refreshTokenValidation = require("../middlewares/validations/refreshTokenValidator")
const validationErrorHandler = require('../middlewares/validations/validationErrorHandler')
const refreshTokenController = require("../controllers/refreshTokenController")

router.post("/",
  refreshTokenValidation,
  validationErrorHandler,
  refreshTokenController.revokeRefreshToken
)

module.exports = router