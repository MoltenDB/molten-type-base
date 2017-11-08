import {getFieldOptions, storageHasType} from '../lib/options';

export const label = 'Field Group';

export const description = 'Used to group a collection of fields together';

export const options = {
  fields: {
    label: 'Fields',
    type: 'field'
  },
  stringValue: { // TODO Need to be able to pass the fields to the label
    // input so that it knows to only use those
    label: 'String Value',
    type: 'label'
  }
};

export const validate = (name, collectionOptions, value) => {
  const fieldOptions = collectionOptions.fields[name];
  // TODO Need function to iterate through fields and validate each one
  if (typeof value === 'undefined' || value === null
      && fieldOptions.required) {
    return new Error('value required');
  } else if (typeof value !== 'object') {
    return new Error('value must be an object');
  }

  let errors = {};
  const subFields = fieldOptions.fields;

  if (subFields) {
    Object.keys(subFields).forEach((field) => {
      const error = mdb.fields[subFields[field].type].validate([name, field],
          collectionOptions, __);

      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length) {
      return errors;
    }
  }

  return null;
};

export const createGroupType: MDB.Type.createType = (mdb: MDB.MoltenInternalInstance) => {
  return {
    label,
    description,
    options,
    validate,
    schema: (name, collectionOptions, storage) => {
      let schema = {};

      // TODO Need a flexible schema database schema to be able to know if can
      // store objects if don't have the fields - may be dangerous
      return schema;
    },
    instance: (name, collectionOptions, storage, resultRow, item) => {
      const fieldOptions = getFieldOptions(name, collectionOptions);
      return {
        toString: () => {
          return ;
        },
        valueOf: () => {
          if (!fieldOptions.fields) {
            if (storageHasType(mdb, fieldOptions.storage, 'object')) {
              return item[name];
            } else {
              return JSON.parse(item[name]);
            }
          } else {
            // Should return an object containing the values from each field
            // underneath. Will need to be constructed as there may be a missing
            // feature of for one of the other fields.
            if (storageHasType(mdb, fieldOptions.storage, 'object')) {
            }
          }
        }
      };
    }
  };
};
export default createGroupType;
