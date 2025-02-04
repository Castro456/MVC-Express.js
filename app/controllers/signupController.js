const usersModel = require("../models/users")
const {successHandler, errorHandler} = require("../middlewares/apiResponseHandler")
const appError = require('../utils/appError');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, userName } = req.body
    const dbUserName = await usersModel.usersList(userName)
  
    if(userName === dbUserName) {
      return errorHandler(res, 500, 'Username already taken', userName)
    }

    return successHandler(res, 200, 'Register can proceed further', userName)
  } 
  catch (error) {
    throw new appError(error, 500);
  }
}