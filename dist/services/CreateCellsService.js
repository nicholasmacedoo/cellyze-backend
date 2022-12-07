"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _AppError = require("../shared/errors/AppError");
const prisma = new _client.PrismaClient();
class CreateCellsService {
  async execute({
    name,
    tenant_id,
    leader_id,
    place
  }) {
    const leader = await prisma.leaders.findUnique({
      where: {
        id: leader_id
      }
    });
    if (!leader) throw new _AppError.AppError('Líder informado não existe');
    const cell = await prisma.cells.create({
      data: {
        name,
        tenant_id,
        leader_id,
        place
      }
    });
    return {
      ...cell,
      leader
    };
  }
}
exports.default = CreateCellsService;