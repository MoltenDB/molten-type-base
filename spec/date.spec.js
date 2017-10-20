"use strict";
var molten_type_1 = require("molten-type");
var date_1 = require("../types/date");
var date_2 = require("../lib/date");
var testDate = new Date();
var testDateOptions = {
    goodOptions: [
        {
            label: 'standard datetime with datetime storage',
            storage: {
                types: ['datetime'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid date',
                    value: testDate,
                    storedValue: testDate,
                    stringValue: testDate.toString()
                }
            ],
            invalidValues: [
                {
                    label: 'number',
                    value: testDate.getTime() / 1000
                },
                {
                    label: 'string',
                    value: testDate.toString()
                }
            ]
        },
        {
            label: 'standard datetime without datetime storage',
            storage: {
                types: [],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid date',
                    value: testDate,
                    storedValue: testDate.valueOf(),
                    stringValue: testDate.toString()
                }
            ]
        },
        {
            label: 'standard date with date storage',
            storage: {
                types: [],
                features: ['date']
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date',
                        format: 'date'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid date',
                    value: testDate,
                    storedValue: testDate,
                    stringValue: (new date_2.DateOnly(testDate)).toString()
                }
            ]
        },
        {
            label: 'standard date without date storage',
            storage: {
                types: [],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date',
                        format: 'date'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid date',
                    value: testDate,
                    storedValue: (new date_2.DateOnly(testDate)).valueOf(),
                    stringValue: (new date_2.DateOnly(testDate)).toString()
                }
            ]
        },
        {
            label: 'standard time with time storage',
            storage: {
                types: ['time'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date',
                        format: 'time'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid date',
                    value: testDate,
                    storedValue: testDate,
                    stringValue: (new date_2.TimeOnly(testDate)).toString()
                }
            ]
        },
        {
            label: 'standard time without time storage',
            storage: {
                types: [],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'date',
                        format: 'time'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid time',
                    value: testDate,
                    storedValue: (new date_2.TimeOnly(testDate)).valueOf(),
                    stringValue: (new date_2.TimeOnly(testDate)).toString()
                }
            ]
        },
    ]
};
molten_type_1.default('Date', date_1.default, testDateOptions);
