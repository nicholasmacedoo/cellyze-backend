"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = require("../config/auth");
var _AppError = require("../errors/AppError");
async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new _AppError.AppError("JWT token is missing", 401);
  const [, token] = authHeader.split(' ');
  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.authConfig.jwt.secret);
    const {
      sub
    } = decoded;
    request["user"] = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.AppError("Invalid JWT token", 401);
  }
}