import PropTypes from 'prop-types';

import { descriptions as ariaDescriptions } from '../../utils/docUtils/ariaAttributes';
import { booleanArg, funcArg } from '../../utils/docUtils/docArgTypes';
import { onHoverArgTypes } from '../../utils/docUtils/hoverProps';

// add designer approved variants for devs to use here
const variantOptions = [
  'critical',
  'default',
  'inline',
  'inlinePrimary',
  'link',
  'primary',
];

const descriptions = {
  isDisabled: 'Whether the button is disabled.',
  isLoading: 'Shows loader instead of children',
  onHoverStart: 'Handler that is called when a hover interaction starts. (e: HoverEvent) => void',
  onHoverEnd: 'Handler that is called when the hover state changes. (isHovering: boolean) => void',
  onHoverChange: 'Handler that is called when the press is released over the target. (e: PressEvent) => void',
  onPress: 'Handler that is called when the press is released over the target. (e: PressEvent) => void',
  onPressChange: 'Handler that is called when the press state changes. (isPressed: boolean) => void',
  onPressEnd: 'Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. (e: PressEvent) => void',
  onPressStart: 'Handler that is called when a press interaction starts. (e: PressEvent) => void',
  onPressUp: 'Handler that is called when a press is released over the target, regardless of whether it started on the target or not. (e: PressEvent) => void',
  variant: 'The styling variation of the button.',
  tabIndex: 'The focus variation of button',
  children: 'Button text.',
};

export const buttonArgTypes = {
  variant: {
    control: {
      type: 'select',
      options: variantOptions,
    },
    defaultValue: 'default',
    description: descriptions.variant,
  },
  children: {
    defaultValue: 'Button Text',
    table: {
      type: {
        summary: 'string',
      },
    },
    control: {
      type: 'text',
    },
    description: descriptions.children,
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
  ...onHoverArgTypes,
  isLoading: {
    ...booleanArg,
    description: descriptions.isLoading,
  },
  isDisabled: {
    ...booleanArg,
    description: descriptions.isDisabled,
  },
  tabIndex: {
    description: descriptions.tabIndex,
  },
  'aria-label': {
    control: {
      type: 'text',
    },
    description: ariaDescriptions.ariaLabel,
  },
};


export const buttonPropTypes = {
  'aria-label': PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onHoverStart: PropTypes.func,
  onHoverEnd: PropTypes.func,
  onHoverChange: PropTypes.func,
  onPress: PropTypes.func,
  onPressStart: PropTypes.func,
  onPressEnd: PropTypes.func,
  onPressChange: PropTypes.func,
  onPressUp: PropTypes.func,
  variant: PropTypes.string,
  tabIndex: PropTypes.number,
};
