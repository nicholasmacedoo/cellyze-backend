"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _cells = _interopRequireDefault(require("./cells.routes"));
var _disciplers = _interopRequireDefault(require("./disciplers.routes"));
var _leaders = _interopRequireDefault(require("./leaders.routes"));
var _reports = _interopRequireDefault(require("./reports.routes"));
var _ensureAuthenticated = _interopRequireDefault(require("../../shared/middlewares/ensureAuthenticated"));
var _sessions = _interopRequireDefault(require("./sessions.routes"));
var _shepherds = _interopRequireDefault(require("./shepherds.routes"));
var _tenants = _interopRequireDefault(require("./tenants.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();

/** Public */
routes.use('/sessions', _sessions.default);
routes.use('/tenants', _tenants.default);
routes.use('/reports', _ensureAuthenticated.default, _reports.default);
/** Ensure Authenticate */
routes.use('/shepherds', _ensureAuthenticated.default, _shepherds.default);
routes.use('/disciplers', _ensureAuthenticated.default, _disciplers.default);
routes.use('/leaders', _ensureAuthenticated.default, _leaders.default);
routes.use('/cells', _ensureAuthenticated.default, _cells.default);
var _default = routes;
exports.default = _default;