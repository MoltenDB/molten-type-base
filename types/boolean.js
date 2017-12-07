"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.label = 'Boolean Type';
exports.description = 'Boolean (true/false)';
exports.options = {
    falseString: {
        type: 'string',
        label: 'False String Value'
    },
    trueString: {
        type: 'string',
        label: 'True String Value'
    }
};
exports.validate = function (name, collectionOptions, value) {
    var options = collectionOptions.fields[name];
    if (!options.convert
        && typeof value !== 'boolean') {
        return new Error('value must be true or false');
    }
    if (options.required && value === null || typeof value === 'undefined') {
        return new Error('value is required');
    }
    return null;
};
exports.createBooleanType = function (mdb) {
    return {
        label: exports.label,
        description: exports.description,
        options: exports.options,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            return _a = {},
                _a[name] = {
                    type: 'boolean'
                },
                _a;
            var _a;
        },
        store: function (name, collectionOptions, storage, value) {
            return _a = {},
                _a[name] = value ? true : false,
                _a;
            var _a;
        },
        fields: function (name, collectionOptions, storage) { return [name]; },
        instance: function (name, collectionOptions, storage, resultRow, item) {
            var options = collectionOptions.fields[name];
            return {
                toString: function () {
                    if (item[name] === null || typeof item[name] === 'undefined') {
                        return '';
                    }
                    return item[name]
                        ? (options.trueString || 'true')
                        : (options.falseString || 'false');
                },
                valueOf: function () {
                    if (item[name] === null || typeof item[name] === 'undefined') {
                        return null;
                    }
                    return item[name];
                }
            };
        }
    };
};
exports.default = exports.createBooleanType;
