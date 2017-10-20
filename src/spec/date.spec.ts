import createTypeTests from 'molten-type';
import createDateType from '../types/date';
import { DateOnly, TimeOnly } from '../lib/date';

const testDate = new Date();

const testDateOptions: MDB.Type.testTestOptions = {
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
          stringValue: (new DateOnly(testDate)).toString()
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
          storedValue: (new DateOnly(testDate)).valueOf(),
          stringValue: (new DateOnly(testDate)).toString()
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
          stringValue: (new TimeOnly(testDate)).toString()
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
          storedValue: (new TimeOnly(testDate)).valueOf(),
          stringValue: (new TimeOnly(testDate)).toString()
        }
      ]
    },
  ]
};
createTypeTests('Date', createDateType, testDateOptions);
