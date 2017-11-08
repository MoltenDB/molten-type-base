"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = require("./types/number");
var string_1 = require("./types/string");
//import { createGroupType } from './types/group';
var date_1 = require("./types/date");
var boolean_1 = require("./types/boolean");
var generic_1 = require("./types/generic");
exports.default = {
    'number': number_1.createNumberType,
    'string': string_1.createStringType,
    'date': date_1.createDateType,
    'boolean': boolean_1.createBooleanType,
    'generic': generic_1.createGenericType
};
