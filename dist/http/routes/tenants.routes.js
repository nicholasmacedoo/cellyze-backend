"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _TenantsControllers = _interopRequireDefault(require("../controllers/TenantsControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const tenantsRoutes = (0, _express.Router)();
const tenantsControllers = new _TenantsControllers.default();
tenantsRoutes.post('/', tenantsControllers.create);
tenantsRoutes.get('/:nameChurch', tenantsControllers.findByChurch);
var _default = tenantsRoutes;
exports.default = _default;