import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { funcArg } from '../../utils/docUtils/docArgTypes';

export const emptyStateArgTypes = {
  heading: { control: 'text', description: 'The empty-state heading.' },
  description: { control: 'text', description: 'Optional supporting description.' },
  buttonLabel: { control: 'text', description: 'Label for the call-to-action button.' },
  onButtonPress: { ...funcArg, description: 'Press handler for the call-to-action button.' },
  headerProps: { control: 'object', description: 'Props spread onto the underlying heading Text.' },
  iconProps: { control: 'object', description: 'Props spread onto the underlying Icon.' },
  buttonProps: { control: 'object', description: 'Props spread onto the underlying Button.' },
  ...ariaAttributeBaseArgTypes,
};
