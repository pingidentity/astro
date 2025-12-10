import type { HoverEvents, PressEvents } from '@react-types/shared';

export type PressProps = PressEvents

export interface HoverProps extends HoverEvents {
  isHovered?: boolean;
}
