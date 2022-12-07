"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateShepherdsService = _interopRequireDefault(require("../../services/CreateShepherdsService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class ShepherdsControllers {
  async create(request, response) {
    const tenant_id = request.user.id;
    const {
      name
    } = request.body;
    const createShepherdsService = new _CreateShepherdsService.default();
    const shepherd = await createShepherdsService.execute({
      name,
      tenant_id
    });
    return response.status(201).json(shepherd);
  }
  async index(request, response) {
    const tenant_id = request.user.id;
    const shepherds = await prisma.shepherds.findMany({
      where: {
        tenant_id
      }
    });
    return response.json(shepherds);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    await prisma.shepherds.delete({
      where: {
        id
      }
    });
    return response.status(204).json();
  }
}
exports.default = ShepherdsControllers;