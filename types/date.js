"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../lib/date");
exports.label = 'Date Type';
exports.description = 'Date/time, either singular or ranged';
exports.options = {
    format: {
        label: 'Date/time type',
        type: ''
    },
    ranged: {
        label: 'Ranged',
        type: 'booleam'
    },
    startRequired: {
        label: 'Start Required',
        type: 'boolean'
    },
    endRequired: {
        label: 'End Required',
        type: 'boolean'
    },
    minimum: {
        label: 'Minimum date/time',
        type: 'date'
    },
    startMaximum: {
        label: 'Start date/time maximum',
        type: 'date'
    },
    endMinimum: {
        label: 'End date/time minimum',
        type: 'date'
    },
    maximum: {
        label: 'Maximum date/time',
        type: 'date'
    }
};
exports.validate = function (name, collectionOptions, value) {
    var options = collectionOptions.fields[name];
    var errors = [];
    if (options.ranged) {
        if (!(value instanceof Object)) {
            return new Error('date must be an object');
        }
        if (typeof value.start && (options.required || options.startRequired)) {
            errors.push(new Error('start is required'));
        }
        if (typeof value.end && (options.required || options.endRequired)) {
            errors.push(new Error('end is required'));
        }
        if (value.start) {
            if (!(value.start instanceof Date)) {
                errors.push(new Error('start must be a valid date/time'));
            }
            else {
                if (options.minimum && value.start.getTime() < options.minimum.getTime()) {
                    errors.push(new Error('start must be on or after the minimum'));
                }
                if (options.startMaximum
                    && value.start.getTime() > options.startMaximum.getTime()) {
                    errors.push(new Error('start must be on or before the maximum'));
                }
                if (value.start.getTime() > value.end.getTime()) {
                    errors.push(new Error('start must be before end'));
                }
            }
        }
        if (value.end) {
            if (!(value.end instanceof Date)) {
                errors.push(new Error('end must be a valid date/time'));
            }
            else {
                if (options.maximum && value.end.getTime() > options.maximum.getTime()) {
                    errors.push(new Error('end must be before or on the maximum'));
                }
                if (options.endMinimum && value.end.getTime() < options.endMinimum.getTime()) {
                    errors.push(new Error('end must be after or on the minimum'));
                }
            }
        }
    }
    else {
        if (!(value instanceof Date)) {
            return new Error('value must be a date');
        }
        if (options.minimum && value.start.getTime() < options.minimum.getTime()) {
            errors.push(new Error('start date must be on or after the minimum date'));
        }
        if (options.maximum && value.end.getTime() > options.maximum.getTime()) {
            errors.push(new Error('end date must be before or on the maximum date'));
        }
    }
    return null;
};
/**@internal
 * Create a Date/DateOnly/TimeOnly object from the given value depending
 * on the given options
 *
 * @param value Value for the Date-like Object
 * @param options Options to determine what Date-like Object to return
 *
 * @returns A Date-like Object (Date/DateOnly/TimeOnly)
 */
var makeDateFromValue = function (value, options) {
    if (value === null || typeof value === 'undefined') {
        return value;
    }
    switch (options.format) {
        case 'date':
            return new date_1.DateOnly(value);
            break;
        case 'time':
            return new date_1.TimeOnly(value);
            break;
        case 'datetime':
        default:
            return new Date(typeof value === 'number' ? value * 1000 : value);
    }
};
exports.createDateType = function (mdb) {
    var storageHasNativeType = function (options, storage) {
        switch (options.format) {
            case 'date':
                return mdb.storageHasType(storage, 'date');
            case 'time':
                return mdb.storageHasType(storage, 'time');
            case 'datetime':
            default:
                return mdb.storageHasType(storage, 'datetime');
        }
    };
    return {
        label: exports.label,
        description: exports.description,
        options: exports.options,
        validate: exports.validate,
        schema: function (name, collectionOptions, storage) {
            var options = collectionOptions.fields[name];
            var fieldType;
            switch (options.format) {
                case 'date':
                    if (mdb.storageHasType(storage, 'date')) {
                        fieldType = 'date';
                    }
                    else {
                        fieldType = 'number';
                    }
                    break;
                case 'time':
                    if (mdb.storageHasType(storage, 'time')) {
                        fieldType = 'time';
                    }
                    else {
                        fieldType = 'number';
                    }
                    break;
                case 'datetime':
                default:
                    if (mdb.storageHasType(storage, 'datetime')) {
                        fieldType = 'datetime';
                    }
                    else {
                        fieldType = 'number';
                    }
            }
            if (options.ranged) {
                return _a = {},
                    _a[name + ".start"] = {
                        type: fieldType
                    },
                    _a[name + ".end"] = {
                        type: fieldType
                    },
                    _a;
            }
            else {
                return _b = {},
                    _b[name] = {
                        type: fieldType
                    },
                    _b;
            }
            var _a, _b;
        },
        fields: function (name, collectionOptions, storage) { return [name]; },
        store: function (name, collectionOptions, storage, value) {
            var options = collectionOptions.fields[name];
            if (value === null || typeof value === 'undefined') {
                return null;
            }
            else {
                value = makeDateFromValue(value, options);
                if (storageHasNativeType(options, storage)) {
                    return _a = {},
                        _a[name] = new Date(value.toString()),
                        _a;
                }
                else {
                    return _b = {},
                        _b[name] = value instanceof Date ? value.valueOf() / 1000 : value.valueOf(),
                        _b;
                }
            }
            var _a, _b;
        },
        instance: function (name, collectionOptions, resultRow, item) {
            var options = collectionOptions.fields[name];
            if (options.ranged) {
                var startDate_1 = makeDateFromValue(item[name].start, options);
                var endDate_1 = makeDateFromValue(item[name].end, options);
                return {
                    toString: function () {
                        if (startDate_1 === null && endDate_1 === null) {
                            return '';
                        }
                        else if (startDate_1 === null) {
                            return "until " + endDate_1;
                        }
                        else if (endDate_1 === null) {
                            return "from " + startDate_1;
                        }
                        else {
                            return "from " + startDate_1 + " until " + endDate_1;
                        }
                    },
                    valueOf: function () { return ({
                        start: makeDateFromValue(startDate_1, options),
                        end: makeDateFromValue(endDate_1, options)
                    }); }
                };
            }
            else {
                //TODO value from store int will not be a timestamp. need to divide Date value by 1000
                var date_2 = makeDateFromValue(item[name], options);
                return {
                    toString: function () { return (date_2 === null ? '' : date_2.toString()); },
                    valueOf: function () { return date_2; }
                };
            }
        }
    };
};
exports.default = exports.createDateType;
