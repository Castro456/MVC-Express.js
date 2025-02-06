const usersModel = require("../models/users");
const {successHandler, errorHandler} =require("../middlewares/apiResponseHandler")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt");

exports.authentication = async (req, res) => {
    try {
        const { user_detail, password } = req.body
        const isPhoneNumber = /^\d+$/.test(user_detail);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_detail);
        let credentialType = 'phone'

        if (isPhoneNumber) {
        }
        else if(isEmail) {
            credentialType = 'email'
        }
        else {
            credentialType = 'none'
        }

        if(credentialType !== 'none') {
            const dbCredential = await usersModel.checkUserCredential(user_detail, credentialType)

            if(dbCredential == '' || dbCredential == undefined) {
                return errorHandler(res, 401, 'Entered phone/email does not exists', user_detail);
            }

            const dbPassword = await usersModel.getPasswordByUserCred(user_detail, credentialType)            
            const passwordMatch = await bcrypt.compare(password, dbPassword.password)

            if(!passwordMatch) {
                return errorHandler(res, 401, 'Authentication Failed', user_detail);
            }

            return successHandler(res, 200, 'Login successful', {});

        }
        else {
            return errorHandler(res, 401, 'Provide proper credentials', credentialType);
        }

    } 
    catch (error) {
        throw new Error(error)
    }
}