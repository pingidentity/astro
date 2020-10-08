export const schema = {
  title: 'Example Title',
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};

export const uiSchema = {
  test: {
    'ui:options': {
      label: 'Text Label',
    },
  },
};
