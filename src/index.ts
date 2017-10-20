import createNumberType from './types/number';
import createStringType from './types/string';
//import createGroupType from './types/group';
import createDateType from './types/date';
import createBooleanType from './types/boolean';

export const number = createNumberType;
export const string = createStringType;
export const date = createDateType;
export const boolean = createBooleanType;

export default {
  number,
  string,
  date,
  boolean
};

