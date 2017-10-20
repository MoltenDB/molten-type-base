"use strict";
var molten_type_1 = require("molten-type");
var string_1 = require("../types/string");
var testStringOptions = {
    goodOptions: [
        {
            label: 'standard string',
            storage: {
                types: ['string'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'string'
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'valid string',
                    value: 'test',
                    storedValue: 'test',
                    stringValue: 'test'
                }
            ],
            invalidValues: [
                {
                    label: 'number',
                    value: 23
                }
            ]
        },
        {
            label: 'length-restricted string',
            storage: {
                types: ['string'],
                features: []
            },
            collection: {
                name: 'test',
                fields: {
                    testField: {
                        type: 'string',
                        minLength: 4,
                        maxLength: 8
                    }
                }
            },
            fieldName: 'testField',
            validValues: [
                {
                    label: 'min-length string',
                    value: 'test',
                    storedValue: 'test',
                    stringValue: 'test'
                },
                {
                    label: 'max-length string',
                    value: 'testtest',
                    storedValue: 'testtest',
                    stringValue: 'testtest'
                }
            ],
            invalidValues: [
                {
                    label: 'number',
                    value: 23
                },
                {
                    label: 'too-short string',
                    value: 'tes'
                },
                {
                    label: 'too-long string',
                    value: 'testtestt'
                }
            ]
        }
    ]
};
molten_type_1.default('String', string_1.default, testStringOptions);
