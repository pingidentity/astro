import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { ariaAttributeBaseArgTypes, ariaAttributeBaseDocSettings } from '../../utils/docUtils/ariaAttributes';

export const listViewArgTypes = {
  ...ariaAttributeBaseArgTypes,
  loadingState: {
    description: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.',
    control: 'radio',
    options: loadingStates,
  },
  disabledKeys: {
    description: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.',
  },
  defaultExpandedKeys: {
    description: 'The initial expanded keys in the collection (uncontrolled).',
  },
  expandedKeys: {
    description: 'The expanded keys in the collection (controlled).',
  },
  onExpandedChange: {
    description: 'Handler that is called when items are expanded or collapsed.',
  },
  items: {
    description: 'The list of ListView items (controlled).',
  },
  id: {
    description: "The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).",
  },
  isHoverable: {
    description: 'Whether ListView should handle hover state (defaults to true)',
  },
  'aria-label': {
    description: 'Defines a string value that labels the current element.',
    ...ariaAttributeBaseDocSettings,
  },
  'aria-labelledby': {
    description: 'Identifies the element (or elements) that labels the current element.',
    ...ariaAttributeBaseDocSettings,
  },
  'aria-describedby': {
    description: 'Identifies the element (or elements) that describes the object.',
    ...ariaAttributeBaseDocSettings,
  },
  'aria-details': {
    description: 'Identifies the element (or elements) that provide a detailed, extended description for the object.',
    ...ariaAttributeBaseDocSettings,
  },
  selectedKeys: {
    description: 'The currently selected keys in the collection (controlled). `selectedKeys="all"` can be used to select every key.',
  },
  selectionMode: {
    description: 'The type of selection that is allowed in the collection.',
  },
  selectionStyle: {
  },
  onSelectionChange: {
    description: 'Callback function that fires when the selected key changes.',
  },
  onLoadMore: {
    description: 'Handler called when more items should be loaded, e.g. while scrolling near the bottom.',
  },
};
