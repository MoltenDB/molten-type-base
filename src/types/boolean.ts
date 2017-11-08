export const label = 'Boolean Type';

export const description = 'Boolean (true/false)';

export const options = {
  falseString: {
    type: 'string',
    label: 'False String Value'
  },
  trueString: {
    type: 'string',
    label: 'True String Value'
  }
};

export const validate = (name, collectionOptions, value) => {
  const options = collectionOptions.fields[name];

  if (!options.convert
      && typeof value !== 'boolean') {
    return new Error('value must be true or false');
  }

  if (options.required && value === null || typeof value === 'undefined') {
    return new Error('value is required');
  }

  return null;
};


export const createBooleanType: MDB.Type.createType = (mdb: MOB.MoltenInternalInstance) => {
  return {
    label,
    description,
    options,
    validate,
    schema: (name, collectionOptions, storage) => {
      return {
        [name]: {
          type: 'boolean'
        }
      };
    },
    store: (name, collectionOptions, storage, value) => {
      return {
        [name]: value ? true : false
      };
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    instance: (name, collectionOptions, storage, resultRow, item) => {
      const options = collectionOptions.fields[name];

      return {
        toString: () => {
          return item[name]
              ? (options.trueString ||  'true')
              : (options.falseString || 'false');
        },
        valueOf: () => {
          return item[name];
        }
      };
    }
  };
};
export default createBooleanType;
