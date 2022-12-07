"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _AppError = require("../shared/errors/AppError");
const prisma = new _client.PrismaClient();
class CreateLeadersService {
  async execute({
    name,
    tenant_id,
    discipler_id
  }) {
    const discipler = await prisma.disciplers.findUnique({
      where: {
        id: discipler_id
      }
    });
    if (!discipler) throw new _AppError.AppError('Discipulador informado não existe');
    const leader = await prisma.leaders.create({
      data: {
        name,
        tenant_id,
        discipler_id,
        shepherd_id: discipler.shepherd_id
      }
    });
    return {
      ...leader,
      discipler
    };
  }
}
exports.default = CreateLeadersService;