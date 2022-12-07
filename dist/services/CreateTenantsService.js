"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _bcrypt = require("bcrypt");
const prisma = new _client.PrismaClient();
class CreateTenantsService {
  async execute({
    name,
    email,
    password
  }) {
    const checkExitsTenant = await prisma.tenants.findUnique({
      where: {
        email
      }
    });
    if (checkExitsTenant) throw new Error('Este usuário já existe');
    const passwordHashed = await (0, _bcrypt.hash)(password, 10);
    const tenant = await prisma.tenants.create({
      data: {
        name,
        email,
        password: passwordHashed
      }
    });
    return tenant;
  }
}
exports.default = CreateTenantsService;