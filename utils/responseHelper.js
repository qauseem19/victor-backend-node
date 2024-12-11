// utils/responseHelper.js
module.exports = {
    success: (res, data, message, statusCode) => {
      return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
      });
    },
  
    errorthrough: (res, message, statusCode, errors = null) => {
      return res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors,
      });
    },
  };
  