"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.label = 'Generic Type';
exports.description = 'Store numbers, strings, object and arrays in any format.';
exports.validate = function (name, collectionOptions, value) {
    if (collectionOptions.fields[name].required
        && (value === null || typeof value === 'undefined')) {
        return new Error('Value is required');
    }
    return null;
};
exports.createGenericType = function (mdb) {
    return {
        label: exports.label,
        description: exports.description,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            if (mdb.storageHasType(storage, ['object', 'array'])) {
                return {};
            }
            else {
                return _a = {},
                    _a[name] = {
                        type: 'string'
                    },
                    _a;
            }
            var _a;
        },
        fields: function (name, collectionOptions, storage) { return [name]; },
        store: function (name, collectionOptions, storage, value) {
            if (mdb.storageHasType(storage, ['object', 'array'])) {
                return _a = {},
                    _a[name] = value,
                    _a;
            }
            else {
                return _b = {},
                    _b[name] = JSON.stringify(value),
                    _b;
            }
            var _a, _b;
        },
        instance: function (name, collectionOptions, storage, resultRow, item) {
            if (mdb.storageHasType(storage, ['object', 'array'])) {
                return {
                    toString: function () { return JSON.stringify(item[name]); },
                    valueOf: function () { return item[name]; }
                };
            }
            else {
                return {
                    toString: function () { return item[name]; },
                    valueOf: function () { return JSON.parse(item[name]); }
                };
            }
        }
    };
};
exports.default = exports.createGenericType;
