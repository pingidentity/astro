import CreateIcon from '@pingux/mdi-react/CreateIcon';
import PropTypes from 'prop-types';

import { descriptions as ariaDescriptions } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';

const descriptions = {
  icon: 'The icon to render. List of icons at https://materialdesignicons.com/',
  isDisabled: 'Whether the icon is disabled.',
  onPress: 'Handler that is called when the press is released over the target. (e: PressEvent) => void',
  onPressChange: 'Handler that is called when the press state changes. (isPressed: boolean) => void',
  onPressEnd: 'Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. (e: PressEvent) => void',
  onPressStart: 'Handler that is called when a press interaction starts. (e: PressEvent) => void',
  onPressUp: 'Handler that is called when a press is released over the target, regardless of whether it started on the target or not. (e: PressEvent) => void',
  title: 'Content will be displayed in a tooltip on hover or focus.',
  variant: 'Styling to apply to the IconButton.',
};

export const iconButtonArgTypes = {
  icon: {
    control: {
      type: 'none',
    },
    description: descriptions.icon,
  },
  title: {
    control: {
      type: 'text',
    },
    description: descriptions.title,
  },
  'aria-label': {
    control: {
      type: 'text',
    },
    description: ariaDescriptions.ariaLabel,
  },
  isDisabled: {
    description: descriptions.isDisabled,
    ...booleanArg,
  },
  variant: {
    control: {
      type: 'select',
      options: ['base', 'inverted', 'invertedSquare', 'square'],
    },
    description: descriptions.variant,
  },
  onPress: {
    description: descriptions.onPress,
    ...funcArg,
  },
  onPressStart: {
    description: descriptions.onPressStart,
    ...funcArg,
  },
  onPressEnd: {
    description: descriptions.onPressEnd,
    ...funcArg,
  },
  onPressChange: {
    description: descriptions.onPressChange,
    ...funcArg,
  },
  onPressUp: {
    description: descriptions.onPressUp,
    ...funcArg,
  },
};

export const iconButtonArgs = {
  icon: CreateIcon,
  variant: 'base',
};

export const iconButtonPropTypes = {
  variant: PropTypes.string,
  'aria-label': PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  onPressStart: PropTypes.func,
  onPressEnd: PropTypes.func,
  onPressChange: PropTypes.func,
  onPressUp: PropTypes.func,
  isDisabled: PropTypes.bool,
};
