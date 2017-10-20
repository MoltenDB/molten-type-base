export const label = 'Number Type';
export const description = 'Basic number';
export const options = {
  minimum: {
    label: 'Minimum value',
    type: 'number'
  },
  maximum: {
    label: 'Maximum value',
    type: 'number'
  },
  convert: {
    label: 'Convert to number',
    type: 'boolean'
  }
};

export const validate = (name, collectionOptions, value) => {
  if (typeof value !== 'number') {
    if (!collectionOptions.fields[name].convert
        || isNaN(value = Number(value))) {
      return new Error('value must be a number');
    }
  }

  if (collectionOptions.fields[name].minimum
      && value < collectionOptions.fields[name].minimum) {
    return new Error(`value is less than ${collectionOptions.fields[name].minimum}`);
  }

  if (collectionOptions.fields[name].maximum
      && value > collectionOptions.fields[name].maximum) {
    return new Error(`value is greater than ${collectionOptions.fields[name].minimum}`);
  }

  return null;
};

export const createNumberType: MDB.Type.createType = (mdb: MDB.MoltenInternalInstance) => {
  return {
    label,
    description,
    options,
    validate,
    schema: (name, collectionOptions, storage) => {
      return {
        [name]: {
          type: 'number'
        }
      };
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    store: (name, collectionOptions, storage, value) => {
      if (typeof value === 'number') {
        return {
          [name]: value
        };
      }
    },
    instance: (name, collectionOptions, resultRow, item) => {
      return {
        toString: () => {
          return item[name].toString();
        },
        valueOf: () => {
          return item[name];
        }
      };
    }
  };
};
export default createNumberType;
