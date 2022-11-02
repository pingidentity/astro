import PropTypes from 'prop-types';

const descriptions = {
  containerProps: 'Identifies the element (or elements) whose contents or presence are controlled by the current element.',
  controlProps: 'Identifies the element (or elements) that describes the object.',
  controlWrapperProps: 'Props object spread to the field control wrapper, i.e. the immediate parent element for the control, sibling of the label, and child of the field container.',
  labelProps: 'Props object spread to the field label, i.e. the visible text which labels the control.',
};

export const inputFieldAttributeBaseDocSettings = {
  type: { summary: 'object' },
  control: { type: 'string' },
  table: {
    category: 'Input Field Attributes',
  },
};


export const inutFieldAttributeBaseArgTypes = {
  'containerProps': {
    description: descriptions.containerProps,
    ...inputFieldAttributeBaseDocSettings,
  },
  'controlProps': {
    description: descriptions.controlProps,
    ...inputFieldAttributeBaseDocSettings,
  },
  'controlWrapperProps': {
    description: descriptions.controlWrapperProps,
    ...inputFieldAttributeBaseDocSettings,
  },
  'labelProps': {
    description: descriptions.labelProps,
    ...inputFieldAttributeBaseDocSettings,
  },
};

export const inputFieldAttributesBasePropTypes = {
  containerProps: PropTypes.shape({}),
  controlProps: PropTypes.shape({}),
  controlWrapperProps: PropTypes.shape({}),
  labelProps: PropTypes.shape({}),
};
