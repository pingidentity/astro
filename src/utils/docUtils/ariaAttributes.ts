import omit from 'lodash/omit';
import PropTypes from 'prop-types';

export const descriptions = {
  ariaControls: 'Identifies the element (or elements) whose contents or presence are controlled by the current element.',
  ariaDescribedby: 'Identifies the element (or elements) that describes the object.',
  ariaDetails: 'Identifies the element (or elements) that provide a detailed, extended description for the object.',
  ariaErrormessage: 'Identifies the element that provides an error message for the object.',
  ariaLabel: 'Defines a string value that labels the current element.',
  ariaLabelledby: 'Identifies the element (or elements) that labels the current element.',
};

export const ariaAttributeBaseDocSettings = {
  control: { type: 'text' },
  table: {
    type: { summary: 'string' },
    category: 'Aria Attributes',
  },
};

export const ariaAttributeBaseArgTypes = {
  'aria-controls': {
    description: descriptions.ariaControls,
    ...ariaAttributeBaseDocSettings,
  },
  'aria-describedby': {
    description: descriptions.ariaDescribedby,
    ...ariaAttributeBaseDocSettings,
  },
  'aria-details': {
    description: descriptions.ariaDetails,
    ...ariaAttributeBaseDocSettings,
  },
  'aria-errormessage': {
    description: descriptions.ariaErrormessage,
    ...ariaAttributeBaseDocSettings,
  },
  'aria-label': {
    description: descriptions.ariaLabel,
    ...ariaAttributeBaseDocSettings,
  },
  'aria-labelledby': {
    description: descriptions.ariaLabelledby,
    ...ariaAttributeBaseDocSettings,
  },
};

export const ariaAttributesBasePropTypes = {
  'aria-controls': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-details': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
};

export const getAriaAttributeProps = props => {
  const ariaProps = Object.entries(props).reduce((acc, [key, val]) => {
    if (key.match(/^aria-.*/)) return { ...acc, [key]: val };
    return { ...acc };
  }, {});

  const nonAriaProps = { ...omit(props, Object.keys(ariaProps)) };

  return { ariaProps, nonAriaProps };
};
