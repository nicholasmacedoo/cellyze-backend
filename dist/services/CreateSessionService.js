"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _bcrypt = require("bcrypt");
var _jsonwebtoken = require("jsonwebtoken");
var _auth = require("../shared/config/auth");
var _AppError = require("../shared/errors/AppError");
const prisma = new _client.PrismaClient();
class CreateSessionService {
  async execute({
    email,
    password
  }) {
    const tenant = await prisma.tenants.findUnique({
      where: {
        email
      }
    });
    if (!tenant) throw new _AppError.AppError('Email/Senha não parece válida');
    const checkPasswordMatched = await (0, _bcrypt.compare)(password, tenant.password);
    if (!checkPasswordMatched) throw new _AppError.AppError('Email/Senha não parece válida');
    const token = (0, _jsonwebtoken.sign)({}, _auth.authConfig.jwt.secret, {
      subject: tenant.id
    });
    return {
      token,
      user: tenant
    };
  }
}
exports.default = CreateSessionService;