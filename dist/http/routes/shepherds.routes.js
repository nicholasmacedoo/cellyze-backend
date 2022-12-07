"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ShepherdsControllers = _interopRequireDefault(require("../controllers/ShepherdsControllers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const shepherdsRoutes = (0, _express.Router)();
const shepherdsControllers = new _ShepherdsControllers.default();
shepherdsRoutes.post('/', shepherdsControllers.create);
shepherdsRoutes.get('/', shepherdsControllers.index);
shepherdsRoutes.delete('/:id', shepherdsControllers.delete);
var _default = shepherdsRoutes;
exports.default = _default;