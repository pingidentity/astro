import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

export const iconButtonToggleArgTypes = {
  isToggled: {
    ...booleanArg,
    description: 'Whether the icon is in the toggled state (use only in controlled mode).',
  },
  onToggle: {
    ...funcArg,
    description: 'Callback invoked when the toggle button is pressed.',
  },
  title: {
    description: 'Text content displayed in a tooltip on hover or focus.',
    control: { type: 'text' },
  },
  variant: {
    description: 'The styling variation of the button element.',
    control: { type: 'text' },
  },
  defaultIcon: {
    description: 'Icon component rendered in the default (untoggled) state.',
    control: { type: null },
  },
  toggledIcon: {
    description: 'Icon component rendered in the toggled state.',
    control: { type: null },
  },
  iconProps: {
    description: 'Props passed to the underlying icon element.',
    control: { type: null },
  },
  buttonProps: {
    description: 'Props passed to the underlying button element.',
    control: { type: null },
  },
};
