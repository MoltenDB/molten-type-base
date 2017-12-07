"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Date/time (range) type.
 *
 * The stored date/times can either be dates, datetimes or times and either be
 * a single value or a two-value range.
 *
 * If native date/time/datetime storage is not available:
 * - datetime values are stored as unix timestamps (number of seconds)
 * - date values are stored as numbers in the YYYYMMDD format
 * - time valies are store as numbers in the HHmm[ss] format
 */
var date_1 = require("../lib/date");
var availableResolutionLabels = {
    second: 'LSD of seconds',
    seconds: 'Number of seconds',
    minute: 'LSD of minutes',
    minutes: 'Number of minutes',
    hours: 'Number of hours',
    weekdays: 'Number of weekdays',
    months: 'Number of months'
};
var availableResolutions = [
    'second', 'seconds',
    'minute', 'minutes',
    'hours',
    'weekdays', 'months'
];
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
    },
    resolutions: {
        label: 'Resolutions to store',
        description: 'Resolutions can be used to retrieve particular values from the collection',
        type: 'string',
        multiple: true,
        values: availableResolutionLabels
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
        return null;
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
            var schema;
            if (options.ranged) {
                schema = (_a = {},
                    _a[name + "_start"] = {
                        type: fieldType
                    },
                    _a[name + "_end"] = {
                        type: fieldType
                    },
                    _a);
            }
            else {
                schema = (_b = {},
                    _b[name] = {
                        type: fieldType
                    },
                    _b);
            }
            if (options.resolutions) {
                options.resolutions.forEach(function (resolution) {
                    schema[name + "_" + resolution] = {
                        type: 'number'
                    };
                });
            }
            return schema;
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
                var storeValue = void 0;
                if (options.ranged) {
                    if (storageHasNativeType(options, storage)) {
                        storeValue = (_a = {},
                            _a[name + "_start"] = value.start.toISOString(),
                            _a[name + "_stop"] = value.stop.toISOString(),
                            _a);
                    }
                    else {
                        storeValue = (_b = {},
                            _b[name] = value.start instanceof Date ? Math.round(value.start.valueOf() / 1000) : value.start.valueOf(),
                            _b[name] = value.stop instanceof Date ? Math.round(value.stop.valueOf() / 1000) : value.stop.valueOf(),
                            _b);
                    }
                }
                else {
                    if (storageHasNativeType(options, storage)) {
                        storeValue = (_c = {},
                            _c[name] = value.toISOString(),
                            _c);
                    }
                    else {
                        storeValue = (_d = {},
                            _d[name] = value instanceof Date ? Math.round(value.valueOf() / 1000) : value.valueOf(),
                            _d);
                    }
                }
                if (options.resolutions) {
                    if (options.resolutions.indexOf('second') !== -1) {
                        storeValue[name + "_second"] = value.getSeconds() % 10;
                    }
                    if (options.resolutions.indexOf('seconds') !== -1) {
                        storeValue[name + "_seconds"] = value.getSeconds();
                    }
                    if (options.resolutions.indexOf('minute') !== -1) {
                        storeValue[name + "_minute"] = value.getMinutes() % 10;
                    }
                    if (options.resolutions.indexOf('minutes') !== -1) {
                        storeValue[name + "_minutes"] = value.getMinutes();
                    }
                    if (options.resolutions.indexOf('hours') !== -1) {
                        storeValue[name + "_hours"] = value.getHours();
                    }
                    if (options.resolutions.indexOf('weekdays') !== -1) {
                        storeValue[name + "_weekdays"] = value.getDay();
                    }
                    if (options.resolutions.indexOf('months') !== -1) {
                        storeValue[name + "_months"] = value.getMonth() + 1;
                    }
                }
                return storeValue;
            }
            var _a, _b, _c, _d;
        },
        filter: function (name, collectionOptions, storage, filter, filterOptions) {
            var options = collectionOptions.fields[name];
            console.log('field options', name, options);
            switch (filter) {
                case 'resolutions':
                    console.log('got a resolutions filter', filterOptions);
                    if (options.resolutions) {
                        var selectedResolutions = Object.keys(filterOptions);
                        if (selectedResolutions.length > 1) {
                            return { $and: selectedResolutions.map(function (resolution) {
                                    if (filterOptions[resolution] instanceof Array) {
                                        return _a = {}, _a[name + "_" + resolution] = { $in: filterOptions[resolution] }, _a;
                                    }
                                    else {
                                        return _b = {}, _b[name + "_" + resolution] = filterOptions[resolution], _b;
                                    }
                                    var _a, _b;
                                }) };
                        }
                        else if (selectedResolutions.length) {
                            var resolution = selectedResolutions[0];
                            if (filterOptions[resolution] instanceof Array) {
                                return _a = {}, _a[name + "_" + resolution] = { $in: filterOptions[resolution] }, _a;
                            }
                            else {
                                return _b = {}, _b[name + "_" + resolution] = filterOptions[resolution], _b;
                            }
                        }
                    }
                    return;
                case 'between':
                    return _c = {}, _c[name] = {
                        $gte: makeDateFromValue(filterOptions[0], collectionOptions),
                        $lt: makeDateFromValue(filterOptions[1], collectionOptions)
                    }, _c;
                case '$lt':
                case '$lte':
                case '$gt':
                case '$gte':
                case '$eq':
                case '$ne':
                    // Check validitity of date
                    return _d = {}, _d[name] = {
                        filter: makeDateFromValue(filterOptions, collectionOptions)
                    }, _d;
            }
            var _a, _b, _c, _d;
        },
        instance: function (name, collectionOptions, storage, resultRow, item) {
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
                    valueOf: function (forJson) { return ({
                        start: date === null ? null : forJson ? startDate_1.valueOf() : makeDateFromValue(startDate_1, options),
                        end: date === null ? null : forJson ? endDate_1.valueOf() : makeDateFromValue(endDate_1, options)
                    }); }
                };
            }
            else {
                //TODO value from store int will not be a timestamp. need to divide Date value by 1000
                var date_2 = makeDateFromValue(item[name], options);
                return {
                    toString: function () { return (date_2 === null ? '' : date_2.toString()); },
                    valueOf: function (forJson) { return date_2 === null ? null : forJson ? date_2.valueOf() : makeDateFromValue(date_2, options); }
                };
            }
        }
    };
};
exports.default = exports.createDateType;
