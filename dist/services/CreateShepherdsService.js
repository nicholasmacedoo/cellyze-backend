"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
class CreateShepherdsService {
  async execute({
    name,
    tenant_id
  }) {
    const shepherd = await prisma.shepherds.create({
      data: {
        name,
        tenant_id
      }
    });
    return shepherd;
  }
}
exports.default = CreateShepherdsService;