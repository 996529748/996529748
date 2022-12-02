"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gridRoll = require("../src/components/gridRoll/gridRoll.vue");

var _gridRoll2 = _interopRequireDefault(_gridRoll);

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gridRoll2.default.install = function (Vue) {
    if (!Vue) {
        window.Vue = Vue = _vue2.default;
    }
    Vue.component(_gridRoll2.default.name, _gridRoll2.default);
};
exports.default = _gridRoll2.default;