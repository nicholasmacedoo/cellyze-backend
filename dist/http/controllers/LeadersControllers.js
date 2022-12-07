"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateLeadersService = _interopRequireDefault(require("../../services/CreateLeadersService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class LeadersControllers {
  async create(request, response) {
    const tenant_id = request.user.id;
    const {
      name,
      discipler_id
    } = request.body;
    const createLeadersService = new _CreateLeadersService.default();
    const leader = await createLeadersService.execute({
      name,
      discipler_id,
      tenant_id
    });
    return response.status(201).json(leader);
  }
  async index(request, response) {
    const tenant_id = request.user.id;
    const leaders = await prisma.leaders.findMany({
      where: {
        tenant_id
      },
      include: {
        discipler: true,
        cells: true
      }
    });
    return response.json(leaders);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    await prisma.leaders.delete({
      where: {
        id
      }
    });
    return response.status(204).json();
  }
}
exports.default = LeadersControllers;