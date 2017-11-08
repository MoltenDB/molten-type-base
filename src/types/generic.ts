import * as MDB from 'molten-core';

export const label = 'Generic Type';
export const description = 'Store numbers, strings, object and arrays in any format.';

export const validate = (name, collectionOptions, value) => {
  if (collectionOptions.fields[name].required
      && (value === null || typeof value === 'undefined')) {
    return new Error('Value is required');
  }

  return null;
};

export const createGenericType: MDB.createType = (mdb: MDB.MoltenInternalInstance) => {
  return {
    label,
    description,
    validate,
    schema: (name, collectionOptions, storage) => {
      if (mdb.storageHasType(storage, ['object', 'array'])) {
        return {
        };
      } else {
        return {
          [name]: {
            type: 'string'
          }
        };
      }
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    store: (name, collectionOptions, storage, value) => {
      if (mdb.storageHasType(storage, ['object', 'array'])) {
        return {
          [name]: value
        };
      } else {
        return {
          [name]: JSON.stringify(value)
        };
      }
    },
    instance: (name, collectionOptions, storage, resultRow, item) => {
      if (mdb.storageHasType(storage, ['object', 'array'])) {
        return {
          toString: () => JSON.stringify(item[name]),
          valueOf: () => item[name]
        };
      } else {
        return {
          toString: () => item[name],
          valueOf: () => JSON.parse(item[name])
        };
      }
    }
  };
};
export default createGenericType;
