"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _AppError = require("../shared/errors/AppError");
const prisma = new _client.PrismaClient();
class CreateDisciplersService {
  async execute({
    name,
    tenant_id,
    shepherd_id
  }) {
    const shepherd = await prisma.shepherds.findUnique({
      where: {
        id: shepherd_id
      }
    });
    if (!shepherd) throw new _AppError.AppError('Pastor informado não existe');
    const discipler = await prisma.disciplers.create({
      data: {
        name,
        tenant_id,
        shepherd_id
      }
    });
    return {
      ...discipler,
      shepherd
    };
  }
}
exports.default = CreateDisciplersService;