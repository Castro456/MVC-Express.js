const usersModel = require("../models/users");
const {successHandler, errorHandler} =require("../middlewares/apiResponseHandler")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt");
const crypto = require("node:crypto")

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
            const dbCredential = await usersModel.checkUserCredential(user_detail, credentialType);

            if(dbCredential == '' || dbCredential == undefined) {
                return errorHandler(res, 401, 'Entered phone/email does not exists', user_detail);
            }

            const dbDetails = await usersModel.getPasswordByUserCred(user_detail, credentialType);            
            const passwordMatch = await bcrypt.compare(password, dbDetails.password);

            if(!passwordMatch) {
                return errorHandler(res, 401, 'Authentication Failed', user_detail);
            }

            const payload = {userId: dbDetails.user_id};
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
            const refreshToken = crypto.randomBytes(64).toString('hex');
            const insertAccessToken = await usersModel.insertRefreshToken(dbDetails.user_id, refreshToken)

            //Next task, work on last login, refresh token, script for refresh token

            if(insertAccessToken && insertAccessToken.id) {
                return successHandler(res, 200, 'Login successful', accessToken)
            }

            return errorHandler(res, 500, 'There was an error occurred, Please try again');
        }
        else {
            return errorHandler(res, 401, 'Enter proper credentials', credentialType);
        }

    } 
    catch (error) {
        throw new Error(error)
    }
}