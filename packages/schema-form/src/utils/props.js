import { FIELD_TYPES } from './constants';

/**
 * Alters the schema object to set strings as booleans when they should be formatted as such
 * @param {Object} schema The raw schema object passed in from the form
 */
export const getCorrectedSchema = (schema) => {
  const { properties } = schema;

  if (!properties) return schema;

  const fixedProperties = Object
    .entries(properties)
    .reduce((result, [prop, propAttrs]) => {
      if (propAttrs.type === FIELD_TYPES.STRING && propAttrs.format === FIELD_TYPES.BOOLEAN) {
        return { ...result, [prop]: { ...propAttrs, type: FIELD_TYPES.BOOLEAN } };
      }

      return { ...result, [prop]: propAttrs };
    }, {});

  return { ...schema, properties: fixedProperties };
};

/**
 * Transforms the given list of options into one that includes disabled option objects
 * @param {Array} optionsArray - Array of objects used to present as dropdown options
 * @param {Array} disabledArray - Array of strings used to determine which options are disabled
 */
export const getDisabledEnumOptions = (optionsArray, disabledArray) => {
  if (!disabledArray) {
    return optionsArray;
  }

  return optionsArray.map((option) => {
    const { label } = option;
    if (disabledArray.includes(label)) {
      return { ...option, disabled: true };
    }

    return option;
  });
};

export default {
  getCorrectedSchema,
  getDisabledEnumOptions,
};
