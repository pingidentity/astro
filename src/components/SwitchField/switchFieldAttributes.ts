import statuses from '../../utils/devUtils/constants/statuses';
import { booleanArg, docArgTypes, funcArg } from '../../utils/docUtils/docArgTypes';

const descriptions = {
  className: 'A list of class names to apply to the input element.',
  hasAutoFocus: 'Whether the element should receive focus on render.',
  helperText: 'Text rendered below the input.',
  hintText: 'If present this prop will cause a help hint to render in the label of the field.',
  id: "The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).",
  isDefaultSelected: 'Whether the element should be selected (uncontrolled).',
  isDisabled: 'Whether the field is disabled.',
  isReadOnly: 'Whether the input can be selected, but not changed by the user.',
  isRequired: 'Whether user input is required on the input before form submission.',
  isSelected: 'Whether the element should be selected (controlled).',
  label: 'The rendered label for the field.',
  name: 'The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).',
  onBlur: 'Handler that is called when the element loses focus.',
  onChange: "Handler that is called when the element's selection state changes.",
  onFocus: 'Handler that is called when the element receives focus.',
  onFocusChange: "Handler that is called when the element's focus status changes.",
  onKeyDown: 'Handler that is called when a key is pressed.',
  onKeyUp: 'Handler that is called when a key is released.',
  status: 'Determines the textarea status indicator and helper text styling.',
  value: 'The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).',
};

const { string, stringArray, text, node } = docArgTypes;

export const switchFieldArgTypes = {
  className: {
    type: { summary: `${string} | ${stringArray}` },
    description: descriptions.className,
  },
  hasAutoFocus: {
    ...booleanArg,
    description: descriptions.hasAutoFocus,
  },
  helperText: {
    control: { type: text },
    type: { summary: node },
    description: descriptions.helperText,
  },
  hintText: {
    control: { type: text },
    type: { summary: string },
    description: descriptions.hintText,
  },
  id: {
    control: { type: text },
    type: { summary: string },
    description: descriptions.id,
  },
  isDefaultSelected: {
    ...booleanArg,
    description: descriptions.isDefaultSelected,
  },
  isDisabled: {
    ...booleanArg,
    description: descriptions.isDisabled,
  },
  isReadOnly: {
    ...booleanArg,
    description: descriptions.isReadOnly,
  },
  isRequired: {
    ...booleanArg,
    description: descriptions.isRequired,
  },
  isSelected: {
    control: { type: 'none' },
    type: { summary: string },
    description: descriptions.isSelected,
  },
  label: {
    control: { type: text },
    type: { summary: string },
    description: descriptions.label,
  },
  name: {
    control: { type: text },
    type: { summary: string },
    description: descriptions.name,
  },
  onBlur: {
    ...funcArg,
    description: descriptions.onBlur,
  },
  onChange: {
    ...funcArg,
    description: descriptions.onChange,
  },
  onFocus: {
    ...funcArg,
    description: descriptions.onFocus,
  },
  onFocusChange: {
    ...funcArg,
    description: descriptions.onFocusChange,
  },
  onKeyDown: {
    ...funcArg,
    description: descriptions.onKeyDown,
  },
  onKeyUp: {
    ...funcArg,
    description: descriptions.onKeyUp,
  },
  value: {
    control: { type: text },
    type: { summary: string },
    description: descriptions.value,
  },
  status: {
    control: {
      type: 'select',
      options: statuses,
    },
    description: descriptions.status,
  },
};

export const switchFieldArgs = {
  label: 'Example Label',
  value: 'my-switch',
  status: statuses.DEFAULT,
};
