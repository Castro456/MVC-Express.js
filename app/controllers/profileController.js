const createError = require('http-errors');
const profileModel = require('../models/profile')
const {apiSuccessHandler} = require('../middlewares/apiResponseHandler');

exports.profileList = async (req, res, next) => {
  try {
    const result = await profileModel.getProfiles()
    apiSuccessHandler(res, 200, 'Data fetched successfully', result)
  } 
  catch (error) {
    // apiErrorHandler(res, 500, 'Internal Sever Error', error) // This will not become asynchronous
    next(createError(500, error, res))
  }
}