class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Marks controlled errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;