import createTypeTests from 'molten-type';
import createGroupType from '../types/group';

const testGroupOptions: MDB.Type.typeTestOptions = {
  goodOptions: [
    {
      label: 'empty group',
      storage: {
        types: ['object'],
        features: ['schemaless']
      },
      collection: {
        name: 'test',
        fields: {
          testGroup: {
            type: 'group'
          }
        }
      },
      fieldName: 'testGroup',
      validValues: [
        {
          label: 'empty object',
          value: {},
          storedValue: {},
          stringValue: ''
        }
      ],
      invalidValues: [
        {
          label: 'string',
          value: 'test'
        }
      ]
    }
  ]
};

createTypeTests('Group', createGroupType, testGroupOptions);
