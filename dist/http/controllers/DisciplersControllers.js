"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateDisciplersService = _interopRequireDefault(require("../../services/CreateDisciplersService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class DisciplersControllers {
  async create(request, response) {
    const tenant_id = request.user.id;
    const {
      name,
      shepherd_id
    } = request.body;
    const createDisciplersService = new _CreateDisciplersService.default();
    const shepherd = await createDisciplersService.execute({
      name,
      tenant_id,
      shepherd_id
    });
    return response.status(201).json(shepherd);
  }
  async index(request, response) {
    const tenant_id = request.user.id;
    const disciplers = await prisma.disciplers.findMany({
      where: {
        tenant_id
      },
      include: {
        shepherd: true
      }
    });
    return response.json(disciplers);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    await prisma.disciplers.delete({
      where: {
        id
      }
    });
    return response.status(204).json();
  }
}
exports.default = DisciplersControllers;