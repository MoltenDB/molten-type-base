"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the field options for the given field from the collection options
 *
 * @param fieldName Name of field to get the options from
 * @param collectionOptions Collection Options
 *
 * @returns The field options
 */
exports.getFieldOptions = function (fieldName, collectionOptions) {
    if (fieldName instanceof Array) {
        var options_1 = collectionOptions;
        fieldName.find(function (field) {
            options_1 = options_1.fields[field];
            if (typeof options_1 === 'undefined') {
                return true;
            }
        });
        return options_1;
    }
    else {
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
exports.storageHasFeature = function (mdb, storage, feature) {
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
exports.storageHasType = function (mdb, storage, type) {
    // TODO Multiple storage
    return (mdb.storage[storage].features.indexOf(type) !== -1);
};
