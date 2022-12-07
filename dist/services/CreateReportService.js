"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _AppError = require("../shared/errors/AppError");
const prisma = new _client.PrismaClient();
class CreateReportService {
  async execute({
    cell_id,
    number_of_members,
    cell_day,
    regulars,
    visitors,
    tenant_id
  }) {
    const cell = await prisma.cells.findUnique({
      where: {
        id: cell_id
      }
    });
    if (!cell) throw new _AppError.AppError('Célula informada não foi encontrada');
    const report = await prisma.reports.create({
      data: {
        cell_day: new Date(cell_day),
        number_of_members,
        regulars,
        visitors,
        cell_id: cell_id,
        tenant_id: tenant_id
      }
    });
    return report;
  }
}
exports.default = CreateReportService;