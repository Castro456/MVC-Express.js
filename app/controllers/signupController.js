const usersModel = require("../models/users")
const {apiSuccessHandler, apiErrorHandler} = require("../middlewares/apiResponseHandler")

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, } = req.body
    const dbUserName = await usersModel.usersList(userName)
  
    if(userName === dbUserName) {
      return apiErrorHandler(res, 409, 'Username already taken', userName)
    }

    // Cont...

    console.log(firstName);
  } catch (error) {
    
  }
}