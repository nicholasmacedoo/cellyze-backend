"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("../../../http/routes"));
var _handleRequestErrors = require("../../middlewares/handleRequestErrors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use(_handleRequestErrors.handleRequestErrors);
var _default = app;
exports.default = _default;