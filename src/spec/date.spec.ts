import createTypeTests from 'molten-type';
import createDateType from '../types/date';
import { DateOnly, TimeOnly } from '../lib/date';

import * as MDBType from 'molten-type';

const testDate = new Date('2008-07-06T05:43Z');

const testDateOptions: MDBType.TypeTestOptions = {
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
          storedValue: {
            testField: testDate
          },
          storedValue: testDate.toISOString(),
          stringValue: testDate.toString()
        }
      ],
      invalidValues: [
        {
          label: 'number',
          value: Math.round(testDate.getTime() / 1000)
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
          storedValue: Math.round(testDate.valueOf() / 1000),
          stringValue: testDate.toString()
        }
      ]
    },
    {
      label: 'standard date with date storage',
      storage: {
        types: ['date'],
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
          value: new DateOnly(testDate),
          enteredValue: testDate,
          storedValue: (new DateOnly(testDate)).toString(),
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
          value: new DateOnly(testDate),
          enteredValue: testDate,
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
          label: 'valid time',
          value: new TimeOnly(testDate),
          enteredValue: testDate,
          storedValue: (new TimeOnly(testDate)).toString(),
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
          value: new TimeOnly(testDate),
          enteredValue: testDate,
          storedValue: (new TimeOnly(testDate)).valueOf(),
          stringValue: (new TimeOnly(testDate)).toString()
        }
      ]
    },
    {
      label: 'datetime with resolutions and without datetime storage',
      storage: {
        types: [],
        features: []
      },
      collection: {
        name: 'test',
        fields: {
          testField: {
            type: 'date',
            resolutions: [ 'second', 'seconds', 'minute', 'minutes',
                'hours', 'weekdays', 'months' ]
          }
        }
      },
      fieldName: 'testField',
      schema: {
        testField: {
          type: 'number',
        },
        testField_second: {
          type: 'number',
        },
        testField_seconds: {
          type: 'number',
        },
        testField_minute: {
          type: 'number',
        },
        testField_minutes: {
          type: 'number',
        },
        testField_hours: {
          type: 'number',
        },
        testField_weekdays: {
          type: 'number',
        },
        testField_months: {
          type: 'number',
        },
      },
      validValues: [
        {
          label: 'valid date',
          value: testDate,
          storedValue: {
            testField: Math.round(testDate.valueOf() / 1000),
            testField_second: testDate.getSeconds() % 10,
            testField_seconds: testDate.getSeconds(),
            testField_minute: testDate.getMinutes() % 10,
            testField_minutes: testDate.getMinutes(),
            testField_hours: testDate.getHours(),
            testField_weekdays: testDate.getDay(),
            testField_months: testDate.getMonth() + 1,
          },
          stringValue: testDate.toString()
        }
      ]
    },
  ]
};
createTypeTests('Date', createDateType, testDateOptions);
