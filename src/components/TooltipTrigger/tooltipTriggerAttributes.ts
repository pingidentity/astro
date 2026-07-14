import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { booleanArg } from '../../utils/docUtils/docArgTypes';

export const tooltipTriggerArgTypes = {
  align: {
    description: 'Alignment of the tooltip relative to the trigger element.',
    control: { type: 'select' },
    options: ['start', 'end', 'middle'],
  },
  direction: {
    description: 'Where the tooltip opens relative to its trigger.',
    control: { type: 'select' },
    options: ['top', 'right', 'bottom', 'left'],
  },
  offset: {
    description: 'Offset of the tooltip relative to its trigger along the primary axis.',
    control: { type: 'number' },
  },
  crossOffset: {
    description: 'Additional offset applied along the cross axis between the tooltip and its anchor.',
    control: { type: 'number' },
  },
  delay: {
    description: 'Delay in milliseconds before the tooltip is shown after hovering.',
    control: { type: 'number' },
  },
  arrowCrossOffset: {
    description: 'Arrow offset relative to the left of the tooltip. Must be a px or percentage value.',
    control: { type: 'text' },
  },
  width: {
    description: 'Width applied to the wrapper of the tooltip component.',
    control: { type: 'text' },
  },
  placement: {
    description: 'The placement of the tooltip with respect to its anchor element.',
    control: { type: 'text' },
  },
  isDarkMode: {
    ...booleanArg,
    description: 'Whether the tooltip uses dark styling with white text (defaults to true).',
  },
  isDefaultOpen: {
    ...booleanArg,
    description: 'Whether the tooltip is open by default (uncontrolled).',
  },
  isNotFlippable: {
    ...booleanArg,
    description: 'Whether the tooltip is prevented from flipping when there is insufficient space for the given direction.',
  },
  hasNoArrow: {
    ...booleanArg,
    description: 'Whether the tooltip arrow indicator is hidden.',
  },
  isOpen: {
    ...booleanArg,
    description: 'Whether the tooltip is currently open (controlled).',
  },
  isDisabled: {
    ...booleanArg,
    description: 'Whether the tooltip trigger is disabled, preventing the tooltip from appearing.',
  },
  ...ariaAttributeBaseArgTypes,
};
