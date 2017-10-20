"use strict";
var number_1 = require("./types/number");
var string_1 = require("./types/string");
//import createGroupType from './types/group';
var date_1 = require("./types/date");
var boolean_1 = require("./types/boolean");
exports.number = number_1.default;
exports.string = string_1.default;
exports.date = date_1.default;
exports.boolean = boolean_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    number: exports.number,
    string: exports.string,
    date: exports.date,
    boolean: exports.boolean
};
