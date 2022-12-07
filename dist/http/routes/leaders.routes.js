"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _LeadersControllers = _interopRequireDefault(require("../controllers/LeadersControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const leadersRoutes = (0, _express.Router)();
const leadersControllers = new _LeadersControllers.default();
leadersRoutes.post('/', leadersControllers.create);
leadersRoutes.get('/', leadersControllers.index);
leadersRoutes.delete('/:id', leadersControllers.delete);
var _default = leadersRoutes;
exports.default = _default;