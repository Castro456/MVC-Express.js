const usersModel = require("../models/users")
const {successHandler, errorHandler} = require("../middlewares/apiResponseHandler")
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, phone, password } = req.body
    const dbUserName = await usersModel.checkUserName(user_name)
    const dbUserEmail = await usersModel.checkUserEmail(email)
    const dbUserPhone = await usersModel.checkUserPhone(phone)

    if(user_name == dbUserName.uname) {
      return errorHandler(res, 500, 'Username already taken', user_name);
    }

    if(email == dbUserEmail.email) {
      return errorHandler(res, 500, 'Email address already exists', email);
    }

    if(phone == dbUserPhone.phone) {
      return errorHandler(res, 500, 'Phone number already exists', phone);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await usersModel.createUser(first_name, last_name, user_name, email, phone, hashedPassword);

    if(!newUser) {
      return errorHandler(res, 500, 'There is an error, Please try later', newUser);
    }

    return successHandler(res, 200, 'Account created successful, Login now');
  } 
  catch (error) {
    throw new AppError(error);
  }
}