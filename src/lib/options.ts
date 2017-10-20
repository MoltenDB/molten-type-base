/**
 * Get the field options for the given field from the collection options
 *
 * @param fieldName Name of field to get the options from
 * @param collectionOptions Collection Options
 *
 * @returns The field options
 */
export const getFieldOptions = (fieldName: string | string[],
    collectionOptions: MDB.Storage.CollectionOptions): MDB.Field => {
  if (fieldName instanceof Array) {
    let options = collectionOptions;

    fieldName.find((field) => {
      options = options.fields[field];
      if (typeof options === 'undefined') {
        return true;
      }
    });

    return options;
  } else {
    return collectionOptions.fields[fieldName];
  }
};

/**
 * Check if the given storage has a particular feature
 *
 * @param mdb Internal instance of MoltenDB to check the storage on
 * @param storage Storage name to check for type
 * @param feature Feature to check for
 *
 * @returns Whether the storage has the feature or not
 */
export const storageHasFeature = (mdb: MDB.MoltenInternalInstance,
    storage: string, feature: string): boolean => {
  // TODO Multiple storage
  return (mdb.storage[storage].features.indexOf(feature) !== -1);
};

/**
 * Check if the given storage has a particular type
 *
 * @param mdb Internal instance of MoltenDB to check the storage on
 * @param storage Storage name to check for type
 * @param type Type to check for
 *
 * @returns Whether the type exists or not
 */
export const storageHasType = (mdb: MDB.MoltenInternalInstance,
    storage: string, type: string): boolean => {
  // TODO Multiple storage
  return (mdb.storage[storage].features.indexOf(type) !== -1);
};
