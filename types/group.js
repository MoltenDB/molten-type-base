"use strict";
var options_1 = require("../lib/options");
exports.label = 'Field Group';
exports.description = 'Used to group a collection of fields together';
exports.options = {
    fields: {
        label: 'Fields',
        type: 'field'
    },
    stringValue: {
        // input so that it knows to only use those
        label: 'String Value',
        type: 'label'
    }
};
exports.validate = function (name, collectionOptions, value) {
    var fieldOptions = collectionOptions.fields[name];
    // TODO Need function to iterate through fields and validate each one
    if (typeof value === 'undefined' || value === null
        && fieldOptions.required) {
        return new Error('value required');
    }
    else if (typeof value !== 'object') {
        return new Error('value must be an object');
    }
    var errors = {};
    var subFields = fieldOptions.fields;
    if (subFields) {
        Object.keys(subFields).forEach(function (field) {
            var error = mdb.fields[subFields[field].type].validate([name, field], collectionOptions, __);
            if (error) {
                errors[field] = error;
            }
        });
        if (Object.keys(errors).length) {
            return errors;
        }
    }
    return null;
};
exports.createGroupType = function (mdb) {
    return {
        label: exports.label,
        description: exports.description,
        options: exports.options,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            var schema = {};
            // TODO Need a flexible schema database schema to be able to know if can
            // store objects if don't have the fields - may be dangerous
            return schema;
        },
        instance: function (name, collectionOptions, resultRow, item) {
            var fieldOptions = options_1.getFieldOptions(name, collectionOptions);
            return {
                toString: function () {
                    return;
                },
                valueOf: function () {
                    if (!fieldOptions.fields) {
                        if (options_1.storageHasType(mdb, fieldOptions.storage, 'object')) {
                            return item[name];
                        }
                        else {
                            return JSON.parse(item[name]);
                        }
                    }
                    else {
                        // Should return an object containing the values from each field
                        // underneath. Will need to be constructed as there may be a missing
                        // feature of for one of the other fields.
                        if (options_1.storageHasType(mdb, fieldOptions.storage, 'object')) {
                        }
                    }
                }
            };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.createGroupType;
