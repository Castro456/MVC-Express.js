const usersModel = require("../models/users")
const {apiSuccessHandler, apiErrorHandler} = require("../middlewares/apiResponseHandler")
const appError = require('../utils/appError');

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, userName } = req.body
    const dbUserName = await usersModel.usersList(userName)
  
    if(userName === dbUserName) {
      throw new appError("Username already taken", 409);
    }

    return apiSuccessHandler(res, 200, 'Register can proceed further')
  } catch (error) {
    // Check if the error is operational (AppError) or unexpected
    if (!(error instanceof appError)) {
      error = new AppError("Something went wrong", 500);
    }
    throw error;
  }
}