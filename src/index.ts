import { createNumberType } from './types/number';
import { createStringType } from './types/string';
//import { createGroupType } from './types/group';
import { createDateType } from './types/date';
import { createBooleanType } from './types/boolean';
import { createGenericType } from './types/generic';

export default {
  'number': createNumberType,
  'string': createStringType,
  'date': createDateType,
  'boolean': createBooleanType,
  'generic': createGenericType
};
