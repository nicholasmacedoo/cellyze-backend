"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ReportsControllers = _interopRequireDefault(require("../controllers/ReportsControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reportRoutes = (0, _express.Router)();
const reportControllers = new _ReportsControllers.default();
reportRoutes.post('/', reportControllers.create);
// reportRoutes.get('/:tenant_id', reportControllers.index);
reportRoutes.get('/month', reportControllers.createReportPDF);
reportRoutes.get('/month/:cell_id', reportControllers.createReportByCell);
// reportRoutes.get('/week', reportControllers.createReportByCell);
var _default = reportRoutes;
exports.default = _default;