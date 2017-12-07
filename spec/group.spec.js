"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//TODO createTypeTests('Group', createGroupType, testGroupOptions);
