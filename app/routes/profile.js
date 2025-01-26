const express = require('express');
const router = express.Router()
const {profileList} = require('../controllers/profileController')

router.get('/', profileList)

module.exports = router