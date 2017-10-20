"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.label = 'String Type';
exports.description = 'Basic string';
exports.options = {
    maxLength: {
        label: 'Maximum length',
        type: 'number'
    },
    minLength: {
        label: 'Minimum length',
        type: 'number'
    },
    convert: {
        label: 'Convert to string',
        type: 'boolean'
    },
    multilingual: {
        label: 'Enable multi-lingual support for string',
        type: 'boolean'
    },
    markdown: {
        label: 'Enable Markdown formatting',
        type: 'boolean'
    }
};
exports.validate = function (name, collectionOptions, value) {
    if (typeof value !== 'string') {
        if (collectionOptions.fields[name].convert) {
            value = JSON.stringify(value);
        }
        else {
            return new Error('value must be a string');
        }
    }
    if (collectionOptions.fields[name].minLength
        && value.length < collectionOptions.fields[name].minLength) {
        return new Error('value is too short');
    }
    if (collectionOptions.fields[name].maxLength
        && value.length > collectionOptions.fields[name].maxLength) {
        return new Error('value is too long');
    }
    return null;
};
exports.createStringType = function (mdb) {
    return {
        label: exports.label,
        description: exports.description,
        options: exports.options,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            var schema = {};
            schema[name] = {
                type: 'string'
            };
            return schema;
        },
        fields: function (name, collectionOptions, storage) { return [name]; },
        store: function (name, collectionOptions, storage, value) {
            if (typeof value === 'string') {
                return _a = {},
                    _a[name] = value,
                    _a;
            }
            var _a;
        },
        instance: function (name, collectionOptions, resultRow, item) {
            return {
                /**
                 * Give the value for the default or the specified language. If a
                 * default language isn't set and no language is given, the first
                 * language will be given.
                 *
                 * @param language Language to return the string value in
                 */
                toString: function (language) {
                    return item[name];
                },
                /**
                 * Return the value of the field. Will either be a string, if
                 * multilingual is not set, or an MDB.LangString containing the string in
                 * the different stored languages
                 */
                valueOf: function () {
                    return item[name];
                }
            };
        }
    };
};
exports.default = exports.createStringType;
