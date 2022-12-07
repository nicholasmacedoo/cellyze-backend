"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateSessionService = _interopRequireDefault(require("../../services/CreateSessionService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SessionsControllers {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const createSession = new _CreateSessionService.default();
    const {
      token,
      user
    } = await createSession.execute({
      email,
      password
    });
    return response.json({
      user,
      token
    });
  }
}
exports.default = SessionsControllers;