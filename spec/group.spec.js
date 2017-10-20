"use strict";
var molten_type_1 = require("molten-type");
var group_1 = require("../types/group");
var testGroupOptions = {
    goodOptions: [
        {
            label: 'empty group',
            storage: {
                types: ['object'],
                features: ['schemaless']
            },
            collection: {
                name: 'test',
                fields: {
                    testGroup: {
                        type: 'group'
                    }
                }
            },
            fieldName: 'testGroup',
            validValues: [
                {
                    label: 'empty object',
                    value: {},
                    storedValue: {},
                    stringValue: ''
                }
            ],
            invalidValues: [
                {
                    label: 'string',
                    value: 'test'
                }
            ]
        }
    ]
};
molten_type_1.default('Group', group_1.default, testGroupOptions);
