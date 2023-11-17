import { funcArg } from './docArgTypes';


const descriptions = {
  onPress: 'Handler that is called when the press is released over the target. (e: PressEvent) => void',
  onPressChange: 'Handler that is called when the press state changes. (isPressed: boolean) => void',
  onPressEnd: 'Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. (e: PressEvent) => void',
  onPressStart: 'Handler that is called when a press interaction starts. (e: PressEvent) => void',
  onPressUp: 'Handler that is called when a press is released over the target, regardless of whether it started on the target or not. (e: PressEvent) => void',
};

const baseDocSettings = {
  ...funcArg,
  table: {
    category: 'Press Handlers',
  },
};

export const onPressArgTypes = {
  onPress: {
    description: descriptions.onPress,
    ...baseDocSettings,
  },
  onPressStart: {
    description: descriptions.onPressStart,
    ...baseDocSettings,
  },
  onPressEnd: {
    description: descriptions.onPressEnd,
    ...baseDocSettings,
  },
  onPressChange: {
    description: descriptions.onPressChange,
    ...baseDocSettings,
  },
  onPressUp: {
    description: descriptions.onPressUp,
    ...baseDocSettings,
  },
};
