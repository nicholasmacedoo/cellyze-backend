"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRequestErrors = handleRequestErrors;
var _AppError = require("../errors/AppError");
function handleRequestErrors(err, request, response, next) {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    messageDeveloper: err.message
  });
}