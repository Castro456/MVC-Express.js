const createError = require('http-errors');
const profileModel = require('../models/profile')

const responseHandler = (response, status, message, data = null) => {
  response.status(status).json({
    'status': status,
    'message': message,
    'data': data,
  })
}

const profileList = async (req, res, next) => {
  try {
    const result = await profileModel.getProfiles()
    responseHandler(res, 200, 'Data fetched successfully', result)
  } 
  catch (error) {
    next(createError(error))
  }
}

module.exports = {
  profileList
}