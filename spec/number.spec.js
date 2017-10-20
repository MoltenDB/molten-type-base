"use strict";
var molten_type_1 = require("molten-type");
var number_1 = require("../types/number");
var testNumberOptions = {
    goodOptions: [
        {
            label: 'standard number',
            storage: {
                types: ['number'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'number'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid number',
                    value: 23,
                    storedValue: 23,
                    stringValue: '23'
                }
            ],
            invalidValues: [
                {
                    label: 'string',
                    value: 'test'
                }
            ]
        },
        {
            label: 'string number',
            storage: {
                types: ['number'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'number',
                        convert: true
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid string number',
                    inputValue: '23',
                    value: 23,
                    storedValue: 23,
                    stringValue: '23'
                }
            ]
        },
        {
            label: 'value-restricted number',
            storage: {
                types: ['number'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'number',
                        minimum: 4,
                        maximum: 8
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'minimum number',
                    value: 4,
                    storedValue: 4,
                    stringValue: '4'
                },
                {
                    label: 'maximum number',
                    value: 8,
                    storedValue: 8,
                    stringValue: '8'
                }
            ],
            invalidValues: [
                {
                    label: 'below minimum number',
                    value: 3
                },
                {
                    label: 'above maximum number',
                    value: 9
                }
            ]
        }
    ]
};
molten_type_1.default('Number', number_1.default, testNumberOptions);
