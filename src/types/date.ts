/**
 * Date/time (range) type.
 *
 * The stored date/times can either be dates, datetimes or times and either be
 * a single value or a two-value range.
 *
 * If native date/time/datetime storage is not available:
 * - datetime values are stored as unix timestamps (number of seconds)
 * - date values are stored as numbers in the YYYYMMDD format
 * - time valies are store as numbers in the HHmm[ss] format
 */
import { DateOnly, TimeOnly } from '../lib/date';

const availableResolutionLabels = {
  second: 'LSD of seconds',
  seconds: 'Number of seconds',
  minute: 'LSD of minutes',
  minutes: 'Number of minutes',
  hours: 'Number of hours',
  weekdays: 'Number of weekdays',
  months: 'Number of months'
};

const availableResolutions = [
  'second', 'seconds',
  'minute', 'minutes',
  'hours',
  'weekdays', 'months'
];

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
  },
  resolutions: {
    label: 'Resolutions to store',
    description: 'Resolutions can be used to retrieve particular values from the collection',
    type: 'string', // TODO lookup? list?
    multiple: true,
    values: availableResolutionLabels
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
    return null;
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

      let schema;

      if (options.ranged) {
        schema = {
          [`${name}_start`]: {
            type: fieldType
          },
          [`${name}_end`]: {
            type: fieldType
          }
        };
      } else {
        schema = {
          [name]: {
            type: fieldType
          }
        };
      }

      if (options.resolutions) {
        options.resolutions.forEach((resolution) => {
          schema[`${name}_${resolution}`] = {
            type: 'number'
          };
        });
      }

      return schema;
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    store: (name, collectionOptions, storage, value) => {
      const options = collectionOptions.fields[name];

      if (value === null || typeof value === 'undefined') {
        return null;
      } else {
        value = makeDateFromValue(value, options);

        let storeValue;

        if (options.ranged) {
          if (storageHasNativeType(options, storage)) {
            storeValue = {
              [`${name}_start`]: value.start.toISOString(),
              [`${name}_stop`]: value.stop.toISOString()
            };
          } else {
            storeValue = {
              [name]: value.start instanceof Date ? Math.round(value.start.valueOf() / 1000) : value.start.valueOf(),
              [name]: value.stop instanceof Date ? Math.round(value.stop.valueOf() / 1000) : value.stop.valueOf()
            };
          }
        } else {
          if (storageHasNativeType(options, storage)) {
            storeValue = {
              [name]: value.toISOString()
            };
          } else {
            storeValue = {
              [name]: value instanceof Date ? Math.round(value.valueOf() / 1000) : value.valueOf()
            };
          }
        }

        if (options.resolutions) {
          if (options.resolutions.indexOf('second') !== -1) {
            storeValue[`${name}_second`] = value.getSeconds() % 10;
          }
          if (options.resolutions.indexOf('seconds') !== -1) {
            storeValue[`${name}_seconds`] = value.getSeconds();
          }
          if (options.resolutions.indexOf('minute') !== -1) {
            storeValue[`${name}_minute`] = value.getMinutes() % 10;
          }
          if (options.resolutions.indexOf('minutes') !== -1) {
            storeValue[`${name}_minutes`] = value.getMinutes();
          }
          if (options.resolutions.indexOf('hours') !== -1) {
            storeValue[`${name}_hours`] = value.getHours();
          }
          if (options.resolutions.indexOf('weekdays') !== -1) {
            storeValue[`${name}_weekdays`] = value.getDay();
          }
          if (options.resolutions.indexOf('months') !== -1) {
            storeValue[`${name}_months`] = value.getMonth() + 1;
          }
        }

        return storeValue;
      }
    },
    filter: (name, collectionOptions, storage, filter, filterOptions) => {
      const options = collectionOptions.fields[name];
      console.log('field options', name, options);

      switch (filter) {
        case 'resolutions':
          console.log('got a resolutions filter', filterOptions);
          if (options.resolutions) { //TODO Type checking
            const selectedResolutions = Object.keys(filterOptions);

            if (selectedResolutions.length > 1) {
              return { $and: selectedResolutions.map((resolution) => {
                if (filterOptions[resolution] instanceof Array) {
                  return { [`${name}_${resolution}`]: { $in: filterOptions[resolution] } };
                } else {
                  return { [`${name}_${resolution}`]: filterOptions[resolution] };
                }
              }) };
            } else if (selectedResolutions.length) {
              const resolution = selectedResolutions[0];
              if (filterOptions[resolution] instanceof Array) {
                return { [`${name}_${resolution}`]: { $in: filterOptions[resolution] } };
              } else {
                return { [`${name}_${resolution}`]: filterOptions[resolution] };
              }
            }
          }
          return;
        case 'between':
          return { [name]: {
            $gte: makeDateFromValue(filterOptions[0], collectionOptions),
            $lt: makeDateFromValue(filterOptions[1], collectionOptions)
          } };
        case '$lt':
        case '$lte':
        case '$gt':
        case '$gte':
        case '$eq':
        case '$ne':
          // Check validitity of date
          return { [name]: {
            filter: makeDateFromValue(filterOptions, collectionOptions)
          } };
      }
    },
    instance: (name, collectionOptions, storage, resultRow, item) => {
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
          valueOf: (forJson) => ({
            start: date === null ? null : forJson ? startDate.valueOf() : makeDateFromValue(startDate, options),
            end: date === null ? null : forJson ? endDate.valueOf() : makeDateFromValue(endDate, options)
          })
        };
      } else {
        //TODO value from store int will not be a timestamp. need to divide Date value by 1000
        let date = makeDateFromValue(item[name], options);

        return {
          toString: () => (date === null ? '' : date.toString()),
          valueOf: (forJson) => date === null ? null : forJson ? date.valueOf() : makeDateFromValue(date, options)
        }
      }
    }
  };
};
export default createDateType;
