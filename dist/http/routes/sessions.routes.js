"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _SessionsControllers = _interopRequireDefault(require("../controllers/SessionsControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sessionsRouter = (0, _express.Router)();
const sessionsControllers = new _SessionsControllers.default();
sessionsRouter.post('/', sessionsControllers.create);
var _default = sessionsRouter;
exports.default = _default;