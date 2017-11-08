"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.label = 'Number Type';
exports.description = 'Basic number';
exports.options = {
    minimum: {
        label: 'Minimum value',
        type: 'number'
    },
    maximum: {
        label: 'Maximum value',
        type: 'number'
    },
    convert: {
        label: 'Convert to number',
        type: 'boolean'
    }
};
exports.validate = function (name, collectionOptions, value) {
    if (typeof value !== 'number') {
        if (!collectionOptions.fields[name].convert
            || isNaN(value = Number(value))) {
            return new Error('value must be a number');
        }
    }
    if (collectionOptions.fields[name].minimum
        && value < collectionOptions.fields[name].minimum) {
        return new Error("value is less than " + collectionOptions.fields[name].minimum);
    }
    if (collectionOptions.fields[name].maximum
        && value > collectionOptions.fields[name].maximum) {
        return new Error("value is greater than " + collectionOptions.fields[name].minimum);
    }
    return null;
};
exports.createNumberType = function (mdb) {
    return {
        label: exports.label,
        description: exports.description,
        options: exports.options,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            return _a = {},
                _a[name] = {
                    type: 'number'
                },
                _a;
            var _a;
        },
        fields: function (name, collectionOptions, storage) { return [name]; },
        store: function (name, collectionOptions, storage, value) {
            if (typeof value === 'number') {
                return _a = {},
                    _a[name] = value,
                    _a;
            }
            var _a;
        },
        instance: function (name, collectionOptions, storage, resultRow, item) {
            return {
                toString: function () {
                    return item[name].toString();
                },
                valueOf: function () {
                    return item[name];
                }
            };
        }
    };
};
exports.default = exports.createNumberType;
