const createError = require('http-errors');
const profileModel = require('../models/profile')
const {apiSuccessHandler, apiErrorHandler} = require('../middlewares/apiResponseHandler');

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
    apiSuccessHandler(res, 200, 'Data fetched successfully', result)
  } 
  catch (error) {
    apiErrorHandler(res, 500, 'Internal Sever Error', error)
  }
}

module.exports = {
  profileList
}