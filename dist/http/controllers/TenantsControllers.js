"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateTenantsService = _interopRequireDefault(require("../../services/CreateTenantsService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class TenantsControllers {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createTenantService = new _CreateTenantsService.default();
    const tenant = await createTenantService.execute({
      name,
      email,
      password
    });
    return response.json(tenant);
  }
  async findByChurch(request, response) {
    const {
      nameChurch
    } = request.params;
    if (!nameChurch) return response.status(404).json({
      message: 'Nome da igreja é obrigatório.'
    });
    const tenant = await prisma.tenants.findUnique({
      select: {
        id: true,
        name: true,
        cells: true
      },
      where: {
        name_church: nameChurch
      }
    });
    return response.json(tenant);
  }
}
exports.default = TenantsControllers;