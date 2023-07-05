export const docArgTypes = {
  bool: 'boolean',
  node: 'node',
  string: 'string',
  stringArray: 'string[]',
  text: 'text',
  func: 'func',
  object: 'object',
};

export const stringOrStringArray = `${docArgTypes.string} | ${docArgTypes.stringArray}`;

export const booleanArg = {
  control: { type: docArgTypes.bool },
  defaultValue: false,
  type: { summary: docArgTypes.bool },
};

export const funcArg = {
  control: { type: null },
  type: { summary: docArgTypes.func },
};
