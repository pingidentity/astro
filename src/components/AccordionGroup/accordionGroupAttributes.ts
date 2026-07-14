import { validHeadingTags } from '../AccordionItem/AccordionItem';

export const accordionGroupArgTypes = {
  id: {
    control: {
      type: 'text',
    },
  },
  disabledKeys: {
    description: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. Array of keys.',
  },
  defaultExpandedKeys: {},
  expandedKeys: {
    control: false,
  },
  items: {
    control: false,
  },
  labelHeadingTag: {
    control: 'radio',
    options: validHeadingTags,
  },
};
