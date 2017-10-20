import { DateOnly, TimeOnly } from '../lib/date';

export const label = 'Date Type';
export const description = 'Date/time, either singular or ranged';
export const options = {
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
  }
};

export const validate = (name, collectionOptions, value) => {
  const options = collectionOptions.fields[name];

  let errors = [];

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
      } else {
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
      } else {
        if (options.maximum && value.end.getTime() > options.maximum.getTime()) {
          errors.push(new Error('end must be before or on the maximum'));
        }
        if (options.endMinimum && value.end.getTime() < options.endMinimum.getTime()) {
          errors.push(new Error('end must be after or on the minimum'));
        }
      }
    }
  } else {
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
const makeDateFromValue = (value, options: MDB.Field) => {
  if (value === null || typeof value === 'undefined') {
    return value;
  }

  switch(options.format) {
    case 'date':
      return new DateOnly(value);
      break;
    case 'time':
      return new TimeOnly(value);
      break;
    case 'datetime':
    default:
      return new Date(typeof value === 'number' ? value * 1000 : value);
  }
};

export const createDateType: MDB.Type.createType = (mdb: MDB.MoltenInternalInstance) => {
  const storageHasNativeType = (options: MDB.Field, storage: string): boolean => {
    switch(options.format) {
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
    label,
    description,
    options,
    validate,
    schema: (name, collectionOptions, storage) => {
      const options = collectionOptions.fields[name];
      let fieldType;

      switch (options.format) {
        case 'date':
          if (mdb.storageHasType(storage, 'date')) {
            fieldType = 'date';
          } else {
            fieldType = 'number';
          }
          break;
        case 'time':
          if (mdb.storageHasType(storage, 'time')) {
            fieldType = 'time';
          } else {
            fieldType = 'number';
          }
          break;
        case 'datetime':
        default:
          if (mdb.storageHasType(storage, 'datetime')) {
            fieldType = 'datetime';
          } else {
            fieldType = 'number';
          }
      }

      if (options.ranged) {
        return {
          [`${name}.start`]: {
            type: fieldType
          },
          [`${name}.end`]: {
            type: fieldType
          }
        };
      } else {
        return {
          [name]: {
            type: fieldType
          }
        };
      }
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    store: (name, collectionOptions, storage, value) => {
      const options = collectionOptions.fields[name];

      if (value === null || typeof value === 'undefined') {
        return null;
      } else {
        value = makeDateFromValue(value, options);

        if (storageHasNativeType(options, storage)) {
          return {
            [name]: new Date(value.toString())
          };
        } else {
          return {
            [name]: value instanceof Date ? value.valueOf() / 1000 : value.valueOf()
          };
        }
      }
    },
    instance: (name, collectionOptions, resultRow, item) => {
      const options = collectionOptions.fields[name];

      if (options.ranged) {
        let startDate = makeDateFromValue(item[name].start, options);
        let endDate = makeDateFromValue(item[name].end, options);

        return {
          toString: () => {
            if (startDate === null && endDate === null) {
              return '';
            } else if (startDate === null) {
              return `until ${endDate}`;
            } else if (endDate === null) {
              return `from ${startDate}`;
            } else {
              return `from ${startDate} until ${endDate}`;
            }
          },
          valueOf: () => ({
            start: makeDateFromValue(startDate, options),
            end: makeDateFromValue(endDate, options)
          })
        };
      } else {
        //TODO value from store int will not be a timestamp. need to divide Date value by 1000
        let date = makeDateFromValue(item[name], options);

        return {
          toString: () => (date === null ? '' : date.toString()),
          valueOf: () => date
        }
      }
    }
  };
};
export default createDateType;
