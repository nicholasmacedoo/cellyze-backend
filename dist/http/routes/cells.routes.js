"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _CellsControllers = _interopRequireDefault(require("../controllers/CellsControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cellsRoutes = (0, _express.Router)();
const cellsControllers = new _CellsControllers.default();
cellsRoutes.post('/', cellsControllers.create);
cellsRoutes.get('/', cellsControllers.index);
cellsRoutes.delete('/:id', cellsControllers.delete);
var _default = cellsRoutes;
exports.default = _default;