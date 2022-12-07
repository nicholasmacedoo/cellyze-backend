"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateCellsService = _interopRequireDefault(require("../../services/CreateCellsService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class CellControllers {
  async create(request, response) {
    const tenant_id = request.user.id;
    const {
      name,
      leader_id,
      place
    } = request.body;
    const createCellsService = new _CreateCellsService.default();
    const shepherd = await createCellsService.execute({
      name,
      tenant_id,
      leader_id,
      place
    });
    return response.status(201).json(shepherd);
  }
  async index(request, response) {
    const tenant_id = request.user.id;
    const cells = await prisma.cells.findMany({
      where: {
        tenant_id
      },
      include: {
        leader: true
      }
    });
    return response.json(cells);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    await prisma.cells.delete({
      where: {
        id
      }
    });
    return response.status(204).json();
  }
}
exports.default = CellControllers;