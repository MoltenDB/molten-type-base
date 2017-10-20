import createTypeTests from 'molten-type';
import createStringType from '../types/string';

const testStringOptions: MDB.Type.typeTestOptions = {
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

createTypeTests('String', createStringType, testStringOptions);
