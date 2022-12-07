"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _DisciplersControllers = _interopRequireDefault(require("../controllers/DisciplersControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const disciplersRoutes = (0, _express.Router)();
const disciplersControllers = new _DisciplersControllers.default();
disciplersRoutes.post('/', disciplersControllers.create);
disciplersRoutes.get('/', disciplersControllers.index);
disciplersRoutes.delete('/:id', disciplersControllers.delete);
var _default = disciplersRoutes;
exports.default = _default;