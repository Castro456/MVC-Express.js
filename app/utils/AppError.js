// First, in your error handling file (e.g., utils/AppError.js)
class AppError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'error';
    this.data = data;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;