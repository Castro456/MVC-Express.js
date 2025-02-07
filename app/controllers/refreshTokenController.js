const usersModel = require("../models/users")
const {errorHandler} = require("../middlewares/apiResponseHandler")
const jwt = require("jsonwebtoken")
const crypto = require("node:crypto")

exports.revokeRefreshToken = async (req, res) => {
  try {
    const {refresh_token} = req.body
    const dbRefreshToken = await usersModel.getRefreshToken(refresh_token)
  
    if(dbRefreshToken && dbRefreshToken.user_id) {
      const payload = {userId: dbRefreshToken.user_id};
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1hr'});

      const newRefreshToken = crypto.randomBytes(64).toString('hex')
      const updateRefreshToken = await usersModel.updateRefreshToken(dbRefreshToken.user_id, newRefreshToken)

      if(updateRefreshToken && updateRefreshToken.id) {
        res.status(200).json({
          status: 'success',
          statusCode: 200,
          message: 'Token creation successful',
          refreshToken: newRefreshToken,
          accessToken
        })
      }

    }
    else {
      return errorHandler(res, 401, 'Invalid Refresh Token', refresh_token)
    }
  }
  catch (error) {
    throw new Error(error)
  }
}