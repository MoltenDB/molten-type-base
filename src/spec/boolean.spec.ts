import createTypeTests from 'molten-type';
import createBooleanType from '../types/boolean';

const testBooleanOptions: MDB.Type.typeTestOptions = {
  goodOptions: [
    {
      label: 'standard boolean',
      storage: {
        types: ['boolean'],
        features: []
      },
      collection: {
        name: 'test',
        fields: {
          testField: {
            type: 'boolean'
          }
        }
      },
      fieldName: 'testField',
      validValues: [
        {
          label: 'true value',
          value: true,
          storedValue: true,
          stringValue: 'true'
        },
        {
          label: 'false value',
          value: false,
          storedValue: false,
          stringValue: 'false'
        }
      ],
      invalidValues: [
        {
          label: 'string value',
          value: 'test'
        },
        {
          label: 'number value',
          value: 1
        }
      ]
    },
    {
      label: 'truthy/falsey values with string values',
      storage: {
        types: ['boolean'],
        features: []
      },
      collection: {
        name: 'test',
        fields: {
          testField: {
            type: 'boolean',
            convert: true,
            falseString: 'No',
            trueString: 'Yes'
          }
        }
      },
      fieldName: 'testField',
      validValues: [
        {
          label: 'true value',
          value: true,
          storedValue: true,
          stringValue: 'Yes'
        },
        {
          label: 'true number (non-zero) value',
          enteredValue: 1,
          value: true,
          storedValue: true,
          stringValue: 'Yes'
        },
        {
          label: 'true string (non-empty) value',
          enteredValue: 'true',
          value: true,
          storedValue: true,
          stringValue: 'Yes'
        },
        {
          label: 'false value',
          value: false,
          storedValue: false,
          stringValue: 'No'
        },
        {
          label: 'false number (zero) value',
          enteredValue: 0,
          value: false,
          storedValue: false,
          stringValue: 'No'
        },
        {
          label: 'false string (empty) value',
          value: false,
          enteredValue: '',
          storedValue: false,
          stringValue: 'No'
        }
      ]
    },
    {
      label: 'standard boolean',
      storage: {
        types: ['boolean'],
        features: []
      },
      collection: {
        name: 'test',
        fields: {
          testField: {
            type: 'boolean'
          }
        }
      },
      fieldName: 'testField',
      validValues: [
        {
          label: 'true value',
          value: true,
          storedValue: true,
          stringValue: 'true'
        },
        {
          label: 'false value',
          value: false,
          storedValue: false,
          stringValue: 'false'
        }
      ],
      invalidValues: [
        {
          label: 'string value',
          value: 'test'
        },
        {
          label: 'number value',
          value: 1
        }
      ]
    },
  ]
};

createTypeTests('Boolean', createBooleanType, testBooleanOptions);

