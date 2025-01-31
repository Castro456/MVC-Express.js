const usersModel = require("../models/users")
const createError = require("http-errors")
const {apiSuccessHandler} = require("../middlewares/apiResponseHandler")

exports.getUsers = async (req, res, next) => {
  try {
    const usersList = await usersModel.usersList()
    console.log(usersList);
    apiSuccessHandler(res, 200, 'Users list retrieved successfully', usersList)
  } catch (error) {
    next(createError(500, error, res))
  }
}