const usersModel = require("../models/users");
const {successHandler, errorHandler} =require("../middlewares/apiResponseHandler")
const jwt = require('jsonwebtoken');

exports.authentication = async (req, res) => {
    try {
        const { user_detail, password } = req.body
        const isPhoneNumber = /^\d+$/.test(user_detail);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_detail);
        let enteredCredential = 'phone'

        if (isPhoneNumber) {
        }
        else if(isEmail) {
            enteredCredential = 'email'
        }
        else {
            enteredCredential = 'none'
        }

        if(enteredCredential !== 'none') {
            const dbCredential = await usersModel.checkUserCredential(user_detail, enteredCredential)

            if(!dbCredential) {
                return errorHandler(res, 500, 'Entered user detail does not exists', user_detail);
            }

            console.log('happy');
        }
        else {
            console.log('not happy');
        }

    } 
    catch (error) {
        throw new Error(error)
    }
}