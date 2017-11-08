export const label = 'String Type';
export const description = 'Basic string';
export const options = {
  maxLength: {
    label: 'Maximum length',
    type: 'number'
  },
  minLength: {
    label: 'Minimum length',
    type: 'number'
  },
  convert: {
    label: 'Convert to string',
    type: 'boolean'
  },
  multilingual: {
    label: 'Enable multi-lingual support for string',
    type: 'boolean'
  },
  markdown: {
    label: 'Enable Markdown formatting',
    type: 'boolean'
  }
};

export const validate = (name, collectionOptions, value) => {
  if (typeof value !== 'string') {
    if (collectionOptions.fields[name].convert) {
      value = JSON.stringify(value);
    } else {
      return new Error('value must be a string');
    }
  }

  if (collectionOptions.fields[name].minLength
      && value.length < collectionOptions.fields[name].minLength) {
    return new Error('value is too short');
  }

  if (collectionOptions.fields[name].maxLength
      && value.length > collectionOptions.fields[name].maxLength) {
    return new Error('value is too long');
  }

  return null;
};

export const createStringType: MDB.createType = (mdb: MDB.MoltenInternalInstance) => {
  return {
    label,
    description,
    options,
    validate,
    schema: (name, collectionOptions, storage) => {
      return {
        [name]: {
          type: 'string'
        }
      };
    },
    fields: (name, collectionOptions, storage): Array<string> => [name],
    store: (name, collectionOptions, storage, value) => {
      if (typeof value === 'string') {
        return {
          [name]: value
        };
      }
    },
    instance: (name, collectionOptions, storage, resultRow, item) => {
      return {
        /**
         * Give the value for the default or the specified language. If a
         * default language isn't set and no language is given, the first
         * language will be given.
         *
         * @param language Language to return the string value in
         */
        toString: (language?: string) => {
          return item[name];
        },
        /**
         * Return the value of the field. Will either be a string, if
         * multilingual is not set, or an MDB.LangString containing the string in
         * the different stored languages
         */
        valueOf: (): MDB.LangString => {
          return item[name];
        }
      };
    }
  };
};
export default createStringType;
